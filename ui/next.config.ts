import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  transpilePackages: [
    "../server/agents/recall/types.ts",
    "../server/agents/summary/types",

    "../server/agents/chat.ts",
    "../server/common/demo.ts",
    "../server/common/forms.ts",
    "../server/common/session-context.ts",
    "../server/common/session-turns.ts",
    "../server/common/sync-ids.ts",
    "../server/common/twilio-types.ts",
  ],
  output: "standalone",
};

export default nextConfig;
