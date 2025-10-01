import { CallStatusIcon } from "@/components/CallTable/CallStatusIcon";
import { useAppSelector } from "@/state/hooks";
import { selectSessionById, selectSessionIds } from "@/state/sessions";
import { getIsCallLoaded, useInitializeCall } from "@/state/sync";
import {
  Checkbox,
  Group,
  Loader,
  Pagination,
  Table,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";
import { PropsWithChildren, useState } from "react";
import { useUIDSeed } from "react-uid";
import { DeleteCallModal } from "./CallTable/DeleteCallModal";

export function CallTable() {
  const callSids = useAppSelector(selectSessionIds);

  const [activePage, setPage] = useState(1);
  const [pageSize] = useState(10);
  const chunks = chunk(callSids, pageSize);
  const visibleIds = chunks[activePage - 1] ?? [];

  const seedRow = useUIDSeed();

  const [selectedSids, setSelectedSids] = useState<string[]>([]);

  const toggleRow = (selectedSid: string) =>
    selectedSids.includes(selectedSid)
      ? setSelectedSids(selectedSids.filter((sid) => selectedSid !== sid))
      : setSelectedSids([...selectedSids, selectedSid]);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Title order={3}>Call Records</Title>

        <Group gap="xs">
          <DeleteCallModal
            selectedSids={selectedSids}
            setSelectedSids={setSelectedSids}
          />
          <Pagination
            total={callSids.length / pageSize}
            value={activePage}
            onChange={setPage}
            size="sm"
          />
        </Group>
      </div>

      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th>Title</Table.Th>
            <Table.Th>CallSid</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th style={{ maxWidth: "100px" }}>Topics</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {visibleIds.map((callSid) => (
            <CallRow
              callSid={callSid}
              key={seedRow(callSid)}
              isSelected={selectedSids.includes(callSid)}
              toggle={() => toggleRow(callSid)}
            />
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
}

function chunk<T>(array: T[], size: number): T[][] {
  if (!array.length) return [];

  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
}

function CallRow({
  callSid,
  isSelected,
  toggle,
}: {
  callSid: string;
  isSelected: boolean;
  toggle: () => void;
}) {
  useInitializeCall(callSid);
  const seedTopic = useUIDSeed();

  const session = useAppSelector((state) => selectSessionById(state, callSid));

  const [date, time] = new Date(session.dateCreated)
    .toLocaleString("en-au", { hour12: false })
    .split(",");

  const callStatus = session?.call?.status;
  const direction = session?.setup?.direction ?? "inbound";

  const title = session?.summary?.title;
  const topics = session?.summary?.topics ?? [];

  return (
    <Table.Tr bg={isSelected ? "var(--mantine-color-blue-light)" : undefined}>
      <Table.Td>
        <Checkbox checked={isSelected} onChange={toggle} size="xs" />
      </Table.Td>

      <Table.Td>
        <CallLoader callSid={callSid}>
          <Text size="sm">{title ?? `${direction} call`}</Text>
        </CallLoader>
      </Table.Td>
      <Table.Td>
        <Link href={`/calls/${callSid}`}>
          <Text size="xs">{callSid.slice(0, 10)}</Text>
        </Link>
      </Table.Td>

      <Table.Td>
        <CallLoader callSid={callSid}>
          <CallStatusIcon status={callStatus} />
        </CallLoader>
      </Table.Td>
      <Table.Td>
        <Text size="sm">
          {date}
          <br />
          {time}
        </Text>
      </Table.Td>
      <Table.Td style={{ overflow: "scroll" }}>
        <CallLoader callSid={callSid}>
          <div style={{ maxWidth: "125px", textWrap: "nowrap" }}>
            {topics.map((topic) => (
              <Text size="sm" key={seedTopic(callSid + topic)}>
                {topic}
              </Text>
            ))}
          </div>
        </CallLoader>
      </Table.Td>
    </Table.Tr>
  );
}

function CallLoader({
  callSid,
  children,
}: PropsWithChildren<{ callSid: string }>) {
  const isCallLoaded = useAppSelector((state) =>
    getIsCallLoaded(state, callSid)
  );

  return isCallLoaded ? children : <Loader size="sm" />;
}
