import { BackendHeader } from "@/components/Header";
import { Helmet } from "@/components/Helmet";
import { ScreenRequestModal } from "@/components/ScreenRequestModal";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { AppStore, makeStore } from "@/state/store";
import {
  fetchInitialCallData,
  fetchInitialUserData,
  getPageChanges,
  initSyncClient,
  removePageChange,
  useInitializeCall,
  useInitializeUserForms,
  useListenForFormStreams,
  useListenForNewCalls,
} from "@/state/sync";
import "@/styles/globals.css";
import { inter, theme } from "@/styles/theme";
import { isDev, isServer } from "@/utils/env";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { AnimatePresence, motion } from "motion/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";

export default function App(props: AppProps) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    if (!isServer) storeRef.current.dispatch(initSyncClient());

    if (!isServer) storeRef.current.dispatch(fetchInitialCallData());
    if (!isServer) storeRef.current.dispatch(fetchInitialUserData());
  }

  useEffect(() => {
    // @ts-expect-error - local development only
    if (isDev && !isServer) window.STORE = storeRef.current;
  }, []);

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Provider store={storeRef.current}>
        <MantineProvider theme={theme}>
          <Switch {...props} />
        </MantineProvider>
      </Provider>
    </>
  );
}

function Switch(props: AppProps) {
  useListenForNewCalls(); // listens for incoming-call webhooks and conversation relay calls connected

  const callSid = props.router.query.callSid as string | undefined;
  useInitializeCall(callSid); // fetch the turns & context for calls and add listeners

  useInitializeUserForms(); // fetches the activeUser's form and add listeners

  const path = props.router.asPath;
  const isFrontend = /owl/i.test(path);
  const isFlex = /flex/i.test(path);
  const router = useRouter();

  if (isFlex) return <BaseComponent {...props} />;

  if (isFrontend)
    return (
      <>
        <AnimatePresence mode="wait">
          <motion.div
            key={router.asPath} // ← unique key on each route
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{ position: "relative" }}
          >
            <OwlMortgage {...props} />
          </motion.div>
        </AnimatePresence>
      </>
    );

  return <Backend {...props} />;
}

function OwlMortgage({ Component, pageProps }: AppProps) {
  useListenForFormStreams();
  usePageChangeListener();

  return (
    <>
      <main>
        <Component {...pageProps} />
      </main>
      <ScreenRequestModal />
    </>
  );
}

function usePageChangeListener() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const pageChanges = useAppSelector(getPageChanges);

  useEffect(() => {
    if (!pageChanges.length) return;
    const formName = pageChanges[0].formName;
    for (const change of pageChanges) dispatch(removePageChange(change.id));

    router.push(`/owl/forms/${formName}`);
  }, [router, pageChanges, dispatch]);
}

function Backend({ Component, pageProps }: AppProps) {
  return (
    <>
      <Helmet />

      <BackendHeader />

      <main className="backend-main">
        <Component {...pageProps} />
      </main>
    </>
  );
}

function BaseComponent({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
