import { 
  Paper, 
  Stack, 
  Text, 
  Title, 
  Group, 
  Badge, 
  Card,
  SimpleGrid,
  Box,
  Divider,
  Timeline,
  List,
  Progress
} from "@mantine/core";
import { 
  IconCalendar,
  IconFileText,
  IconBuildingBank,
  IconUsers,
  IconCurrencyDollar,
  IconKey,
  IconClipboardCheck,
  IconAlertCircle,
  IconPhone,
  IconMail
} from "@tabler/icons-react";

interface SettlementData {
  settlementDate: Date;
  timeRemaining: number; // days
  purchasePrice: number;
  deposit: number;
  balanceDue: number;
  contacts: {
    type: "solicitor" | "agent" | "lender" | "broker" | "inspector";
    name: string;
    company: string;
    phone: string;
    email: string;
    role: string;
  }[];
  documents: {
    name: string;
    status: "received" | "pending" | "required" | "verified";
    dueDate?: Date;
    provider: string;
    critical: boolean;
  }[];
  financials: {
    item: string;
    amount: number;
    type: "credit" | "debit";
    category: "purchase" | "fees" | "adjustments" | "taxes";
  }[];
  tasks: {
    id: string;
    task: string;
    responsible: string;
    dueDate: Date;
    status: "completed" | "pending" | "overdue";
    critical: boolean;
  }[];
}

const mockSettlementData: SettlementData = {
  settlementDate: new Date("2025-10-30T14:00:00"),
  timeRemaining: 14,
  purchasePrice: 1150000,
  deposit: 115000,
  balanceDue: 1035000,
  contacts: [
    {
      type: "solicitor",
      name: "Sarah Mitchell",
      company: "Mitchell & Associates",
      phone: "(02) 9555-0123",
      email: "sarah.mitchell@mitchellconvey.com.au",
      role: "Buyer's Solicitor"
    },
    {
      type: "solicitor",
      name: "David Chen",
      company: "Chen Legal Services", 
      phone: "(02) 9444-5678",
      email: "david@chenlegal.com.au",
      role: "Vendor's Solicitor"
    },
    {
      type: "lender",
      name: "Emma Thompson",
      company: "Commonwealth Bank",
      phone: "13 2221",
      email: "emma.thompson@cba.com.au",
      role: "Loan Settlement Manager"
    },
    {
      type: "broker",
      name: "Michael Johnson",
      company: "Johnson Finance Group",
      phone: "(02) 9777-8888",
      email: "michael@jfg.com.au",
      role: "Mortgage Broker"
    },
    {
      type: "agent",
      name: "Lisa Parker",
      company: "Parker Real Estate",
      phone: "(02) 9666-9999",
      email: "lisa@parkerre.com.au",
      role: "Selling Agent"
    }
  ],
  documents: [
    {
      name: "Formal Loan Approval",
      status: "received",
      provider: "Commonwealth Bank",
      critical: true
    },
    {
      name: "Building & Pest Inspection",
      status: "verified", 
      provider: "ABC Building Inspections",
      critical: true
    },
    {
      name: "Owners Corporation Certificate",
      status: "received",
      provider: "Strata Manager",
      critical: true
    },
    {
      name: "Insurance Policy (Building)",
      status: "pending",
      dueDate: new Date("2025-10-25"),
      provider: "Insurance Broker",
      critical: true
    },
    {
      name: "Insurance Policy (Contents)",
      status: "required",
      dueDate: new Date("2025-10-25"),
      provider: "Insurance Broker",
      critical: false
    },
    {
      name: "Transfer Documentation",
      status: "pending",
      dueDate: new Date("2025-10-27"),
      provider: "Buyer's Solicitor",
      critical: true
    },
    {
      name: "Final Water Reading",
      status: "required",
      dueDate: new Date("2025-10-29"),
      provider: "Sydney Water",
      critical: false
    }
  ],
  financials: [
    { item: "Purchase Price", amount: 1150000, type: "debit", category: "purchase" },
    { item: "Deposit Paid", amount: -115000, type: "credit", category: "purchase" },
    { item: "Solicitor Fees", amount: 2500, type: "debit", category: "fees" },
    { item: "Stamp Duty", amount: 45970, type: "debit", category: "taxes" },
    { item: "Building Inspection", amount: 650, type: "debit", category: "fees" },
    { item: "Lender Mortgage Insurance", amount: 8500, type: "debit", category: "fees" },
    { item: "Council Rates Adjustment", amount: -487, type: "credit", category: "adjustments" },
    { item: "Strata Levies Adjustment", amount: 234, type: "debit", category: "adjustments" }
  ],
  tasks: [
    {
      id: "1",
      task: "Arrange building insurance",
      responsible: "Buyer",
      dueDate: new Date("2025-10-25"),
      status: "pending",
      critical: true
    },
    {
      id: "2",
      task: "Final property inspection",
      responsible: "Buyer",
      dueDate: new Date("2025-10-29"),
      status: "pending",
      critical: true
    },
    {
      id: "3",
      task: "Bank cheque preparation",
      responsible: "Solicitor",
      dueDate: new Date("2025-10-28"),
      status: "pending",
      critical: true
    },
    {
      id: "4",
      task: "Transfer documents lodgement", 
      responsible: "Solicitor",
      dueDate: new Date("2025-10-30"),
      status: "pending",
      critical: true
    },
    {
      id: "5",
      task: "Keys collection arrangement",
      responsible: "Agent",
      dueDate: new Date("2025-10-30"),
      status: "pending",
      critical: false
    }
  ]
};

const getStatusColor = (status: "received" | "pending" | "required" | "verified" | "completed" | "overdue") => {
  switch (status) {
    case "received":
    case "verified":
    case "completed":
      return "green";
    case "pending":
      return "orange";
    case "required":
      return "blue";
    case "overdue":
      return "red";
    default:
      return "gray";
  }
};

const getContactIcon = (type: SettlementData["contacts"][0]["type"]) => {
  switch (type) {
    case "solicitor": return <IconFileText size={16} />;
    case "agent": return <IconUsers size={16} />;
    case "lender": return <IconBuildingBank size={16} />;
    case "broker": return <IconCurrencyDollar size={16} />;
    case "inspector": return <IconClipboardCheck size={16} />;
  }
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};

const formatCurrency = (amount: number) => `$${Math.abs(amount).toLocaleString()}`;

export function SettlementInfo() {
  const data = mockSettlementData;
  
  const totalDebits = data.financials
    .filter(f => f.type === "debit")
    .reduce((sum, f) => sum + f.amount, 0);
  
  const totalCredits = data.financials
    .filter(f => f.type === "credit")
    .reduce((sum, f) => sum + Math.abs(f.amount), 0);
    
  const netAmount = totalDebits - totalCredits;
  
  const criticalDocuments = data.documents.filter(d => d.critical && d.status !== "received" && d.status !== "verified");
  const overdueTasks = data.tasks.filter(t => t.dueDate < new Date() && t.status !== "completed");
  
  const completionProgress = (data.documents.filter(d => d.status === "received" || d.status === "verified").length / data.documents.length) * 100;

  return (
    <Paper p="lg" shadow="sm" radius="md">
      <Title order={3} mb="md">Settlement Information</Title>
      
      <Stack gap="lg">
        {/* Settlement Overview */}
        <Card p="md" withBorder bg="blue.0">
          <Group justify="space-between" mb="md">
            <Group gap="xs">
              <IconCalendar size={24} />
              <Box>
                <Text size="lg" fw={700}>Settlement Date</Text>
                <Text size="sm" c="dimmed">{formatDate(data.settlementDate)}</Text>
              </Box>
            </Group>
            <Box ta="right">
              <Text size="xl" fw={700} c="blue">
                {data.timeRemaining} Days
              </Text>
              <Text size="sm" c="dimmed">Remaining</Text>
            </Box>
          </Group>
          
          <Progress value={(30 - data.timeRemaining) / 30 * 100} color="blue" size="lg" />
        </Card>

        {/* Financial Summary */}
        <Card p="md" withBorder>
          <Title order={4} mb="md">Settlement Statement</Title>
          
          <Stack gap="sm">
            {data.financials.map((item, idx) => (
              <Group key={idx} justify="space-between" p="sm" style={{
                backgroundColor: item.type === "debit" ? "var(--mantine-color-red-0)" : "var(--mantine-color-green-0)",
                borderRadius: "var(--mantine-radius-sm)"
              }}>
                <Text size="sm">{item.item}</Text>
                <Text size="sm" fw={500} c={item.type === "debit" ? "red" : "green"}>
                  {item.type === "debit" ? "-" : "+"}{formatCurrency(item.amount)}
                </Text>
              </Group>
            ))}
            
            <Divider my="md" />
            
            <Group justify="space-between" p="md" bg="gray.1" style={{ borderRadius: "var(--mantine-radius-sm)" }}>
              <Text fw={700}>Net Amount Due at Settlement</Text>
              <Text size="lg" fw={700}>{formatCurrency(netAmount)}</Text>
            </Group>
          </Stack>
        </Card>

        {/* Status Overview */}
        <SimpleGrid cols={3} spacing="md">
          <Card p="md" withBorder ta="center">
            <IconClipboardCheck size={24} color="var(--mantine-color-blue-6)" />
            <Text size="xl" fw={700} mt="xs">{Math.round(completionProgress)}%</Text>
            <Text size="sm" c="dimmed">Documents Ready</Text>
          </Card>
          
          <Card p="md" withBorder ta="center">
            <IconAlertCircle size={24} color="var(--mantine-color-orange-6)" />
            <Text size="xl" fw={700} mt="xs">{criticalDocuments.length}</Text>
            <Text size="sm" c="dimmed">Critical Pending</Text>
          </Card>
          
          <Card p="md" withBorder ta="center">
            <IconKey size={24} color="var(--mantine-color-red-6)" />
            <Text size="xl" fw={700} mt="xs">{overdueTasks.length}</Text>
            <Text size="sm" c="dimmed">Overdue Tasks</Text>
          </Card>
        </SimpleGrid>

        {/* Key Contacts */}
        <Card p="md" withBorder>
          <Title order={4} mb="md">Key Settlement Contacts</Title>
          
          <SimpleGrid cols={1} spacing="md">
            {data.contacts.map((contact, idx) => (
              <Card key={idx} p="sm" withBorder>
                <Group justify="space-between">
                  <Group gap="xs">
                    {getContactIcon(contact.type)}
                    <Box>
                      <Text fw={500}>{contact.name}</Text>
                      <Text size="sm" c="dimmed">{contact.role} - {contact.company}</Text>
                    </Box>
                  </Group>
                  <Group gap="xs">
                    <Group gap={4}>
                      <IconPhone size={14} />
                      <Text size="xs">{contact.phone}</Text>
                    </Group>
                    <Group gap={4}>
                      <IconMail size={14} />
                      <Text size="xs">{contact.email}</Text>
                    </Group>
                  </Group>
                </Group>
              </Card>
            ))}
          </SimpleGrid>
        </Card>

        {/* Document Status */}
        <Card p="md" withBorder>
          <Title order={4} mb="md">Document Checklist</Title>
          
          <Stack gap="sm">
            {data.documents.map((doc, idx) => (
              <Group key={idx} justify="space-between" p="sm" style={{
                border: "1px solid var(--mantine-color-gray-3)",
                borderRadius: "var(--mantine-radius-sm)",
                backgroundColor: doc.critical && (doc.status === "pending" || doc.status === "required") 
                  ? "var(--mantine-color-red-0)" : "transparent"
              }}>
                <Group gap="xs">
                  <Box>
                    <Group gap="xs">
                      <Text size="sm" fw={500}>{doc.name}</Text>
                      {doc.critical && (
                        <Badge size="xs" color="red" variant="light">Critical</Badge>
                      )}
                    </Group>
                    <Text size="xs" c="dimmed">Provider: {doc.provider}</Text>
                    {doc.dueDate && (
                      <Text size="xs" c="dimmed">Due: {formatDate(doc.dueDate)}</Text>
                    )}
                  </Box>
                </Group>
                <Badge color={getStatusColor(doc.status)} variant="light">
                  {doc.status}
                </Badge>
              </Group>
            ))}
          </Stack>
        </Card>

        {/* Settlement Timeline */}
        <Card p="md" withBorder>
          <Title order={4} mb="md">Settlement Tasks</Title>
          
          <Timeline active={-1} bulletSize={24} lineWidth={2}>
            {data.tasks.map((task) => (
              <Timeline.Item
                key={task.id}
                bullet={task.status === "completed" ? <IconClipboardCheck size={16} /> : <IconCalendar size={16} />}
                title={
                  <Group gap="xs">
                    <Text fw={500} td={task.status === "completed" ? "line-through" : "none"}>
                      {task.task}
                    </Text>
                    {task.critical && (
                      <Badge size="xs" color="red" variant="light">Critical</Badge>
                    )}
                  </Group>
                }
              >
                <Group gap="md" mb="xs">
                  <Badge color={getStatusColor(task.status)} variant="light" size="sm">
                    {task.status}
                  </Badge>
                  <Text size="sm" c="dimmed">Responsible: {task.responsible}</Text>
                </Group>
                <Text size="xs" c="dimmed">Due: {formatDate(task.dueDate)}</Text>
              </Timeline.Item>
            ))}
          </Timeline>
        </Card>

        {/* Critical Alerts */}
        {(criticalDocuments.length > 0 || overdueTasks.length > 0) && (
          <Card p="md" withBorder bg="red.0">
            <Group gap="xs" mb="md">
              <IconAlertCircle size={20} color="var(--mantine-color-red-6)" />
              <Title order={4} c="red">Immediate Action Required</Title>
            </Group>
            
            <Stack gap="sm">
              {criticalDocuments.map((doc, idx) => (
                <Text key={idx} size="sm">
                  • <strong>CRITICAL DOCUMENT:</strong> {doc.name} - {doc.status}
                  {doc.dueDate && ` (Due: ${formatDate(doc.dueDate)})`}
                </Text>
              ))}
              
              {overdueTasks.map((task) => (
                <Text key={task.id} size="sm">
                  • <strong>OVERDUE TASK:</strong> {task.task} - Due: {formatDate(task.dueDate)}
                </Text>
              ))}
            </Stack>
          </Card>
        )}

        {/* Settlement Day Checklist */}
        <Card p="md" withBorder bg="green.0">
          <Title order={4} mb="md">Settlement Day Checklist</Title>
          <List spacing="xs" size="sm">
            <List.Item>Final property inspection completed (day before settlement)</List.Item>
            <List.Item>All documents verified and signed</List.Item>
            <List.Item>Bank cheque/electronic transfer confirmed</List.Item>
            <List.Item>Building insurance policy active from settlement date</List.Item>
            <List.Item>Utility connections arranged</List.Item>
            <List.Item>Key collection arranged with selling agent</List.Item>
          </List>
        </Card>
      </Stack>
    </Paper>
  );
}