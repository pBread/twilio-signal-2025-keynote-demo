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
  Accordion,
  List
} from "@mantine/core";
import { 
  IconBuilding,
  IconFileText,
  IconMapPin,
  IconUsers,
  IconCalendar,
  IconCurrencyDollar,
  IconHome,
  IconAlertCircle,
  IconChecks
} from "@tabler/icons-react";

interface ConveyancingData {
  solicitor: {
    name: string;
    firm: string;
    phone: string;
    email: string;
    address: string;
    licenseNumber: string;
  };
  property: {
    address: string;
    lotNumber: string;
    planNumber: string;
    title: string;
    zone: string;
    landSize: string;
    council: string;
  };
  council: {
    name: string;
    phone: string;
    address: string;
    rates: {
      annual: number;
      waterAccess: number;
      sewerage: number;
    };
  };
  searches: {
    name: string;
    status: "completed" | "pending" | "required";
    date?: Date;
    cost: number;
    notes?: string;
  }[];
  conditions: {
    id: string;
    type: "special" | "standard";
    description: string;
    dueDate?: Date;
    status: "met" | "pending" | "overdue";
  }[];
}

const mockConveyancingData: ConveyancingData = {
  solicitor: {
    name: "Sarah Mitchell",
    firm: "Mitchell & Associates Conveyancing",
    phone: "(02) 9555-0123",
    email: "sarah.mitchell@mitchellconvey.com.au",
    address: "Level 12, 88 Phillip Street, Sydney NSW 2000",
    licenseNumber: "NSW-CV-15847"
  },
  property: {
    address: "45 Enmore Road, Newtown NSW 2042",
    lotNumber: "15",
    planNumber: "DP 123456",
    title: "15/DP123456",
    zone: "R1 - General Residential",
    landSize: "450 sqm",
    council: "Inner West Council"
  },
  council: {
    name: "Inner West Council",
    phone: "(02) 9392-5000",
    address: "7-15 Darcy Road, Westmead NSW 2145",
    rates: {
      annual: 2850,
      waterAccess: 186,
      sewerage: 712
    }
  },
  searches: [
    {
      name: "Section 10.7 Planning Certificate",
      status: "completed",
      date: new Date("2025-09-10"),
      cost: 125,
      notes: "No adverse findings"
    },
    {
      name: "Owners Corporation Certificate",
      status: "completed", 
      date: new Date("2025-09-08"),
      cost: 200,
      notes: "Strata report shows healthy finances"
    },
    {
      name: "Water & Sewerage Search",
      status: "pending",
      cost: 45,
      notes: "Awaiting Sydney Water response"
    },
    {
      name: "Land Title Search",
      status: "completed",
      date: new Date("2025-09-12"),
      cost: 30,
      notes: "Clean title, no encumbrances"
    },
    {
      name: "Contaminated Land Search",
      status: "required",
      cost: 75,
      notes: "Required for EPA compliance"
    }
  ],
  conditions: [
    {
      id: "1",
      type: "special",
      description: "Satisfactory building and pest inspection",
      dueDate: new Date("2025-10-20"),
      status: "pending"
    },
    {
      id: "2", 
      type: "standard",
      description: "Finance approval within 21 days",
      dueDate: new Date("2025-10-25"),
      status: "pending"
    },
    {
      id: "3",
      type: "special",
      description: "Strata by-laws review and acceptance",
      dueDate: new Date("2025-10-18"),
      status: "met"
    },
    {
      id: "4",
      type: "standard",
      description: "Contract cooling off period (5 business days)",
      dueDate: new Date("2025-09-16"),
      status: "overdue"
    }
  ]
};

const getStatusColor = (status: "completed" | "pending" | "required" | "met" | "overdue") => {
  switch (status) {
    case "completed":
    case "met":
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

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short", 
    year: "numeric"
  });
};

export function Conveyancing() {
  const data = mockConveyancingData;
  const pendingSearches = data.searches.filter(s => s.status === "pending" || s.status === "required");
  const overdueConditions = data.conditions.filter(c => c.status === "overdue");
  const pendingConditions = data.conditions.filter(c => c.status === "pending");

  return (
    <Paper p="lg" shadow="sm" radius="md">
      <Title order={3} mb="md">Conveyancing Information</Title>
      
      <Stack gap="lg">
        {/* Status Overview */}
        <SimpleGrid cols={4} spacing="md">
          <Card p="md" withBorder ta="center">
            <IconFileText size={24} color="var(--mantine-color-blue-6)" />
            <Text size="xl" fw={700} mt="xs">{data.searches.filter(s => s.status === "completed").length}</Text>
            <Text size="sm" c="dimmed">Searches Complete</Text>
          </Card>
          
          <Card p="md" withBorder ta="center">
            <IconAlertCircle size={24} color="var(--mantine-color-orange-6)" />
            <Text size="xl" fw={700} mt="xs">{pendingSearches.length}</Text>
            <Text size="sm" c="dimmed">Searches Pending</Text>
          </Card>
          
          <Card p="md" withBorder ta="center">
            <IconChecks size={24} color="var(--mantine-color-green-6)" />
            <Text size="xl" fw={700} mt="xs">{data.conditions.filter(c => c.status === "met").length}</Text>
            <Text size="sm" c="dimmed">Conditions Met</Text>
          </Card>
          
          <Card p="md" withBorder ta="center">
            <IconCalendar size={24} color="var(--mantine-color-red-6)" />
            <Text size="xl" fw={700} mt="xs">{overdueConditions.length}</Text>
            <Text size="sm" c="dimmed">Overdue Items</Text>
          </Card>
        </SimpleGrid>

        {/* Solicitor Information */}
        <Card p="md" withBorder>
          <Group gap="xs" mb="md">
            <IconUsers size={20} />
            <Title order={4}>Conveyancing Solicitor</Title>
          </Group>
          
          <SimpleGrid cols={2} spacing="md">
            <Stack gap="sm">
              <Box>
                <Text size="sm" c="dimmed">Solicitor</Text>
                <Text fw={500}>{data.solicitor.name}</Text>
              </Box>
              <Box>
                <Text size="sm" c="dimmed">Firm</Text>
                <Text fw={500}>{data.solicitor.firm}</Text>
              </Box>
              <Box>
                <Text size="sm" c="dimmed">License</Text>
                <Text fw={500}>{data.solicitor.licenseNumber}</Text>
              </Box>
            </Stack>
            
            <Stack gap="sm">
              <Box>
                <Text size="sm" c="dimmed">Phone</Text>
                <Text fw={500}>{data.solicitor.phone}</Text>
              </Box>
              <Box>
                <Text size="sm" c="dimmed">Email</Text>
                <Text fw={500}>{data.solicitor.email}</Text>
              </Box>
              <Box>
                <Text size="sm" c="dimmed">Address</Text>
                <Text fw={500}>{data.solicitor.address}</Text>
              </Box>
            </Stack>
          </SimpleGrid>
        </Card>

        {/* Property Details */}
        <Card p="md" withBorder>
          <Group gap="xs" mb="md">
            <IconHome size={20} />
            <Title order={4}>Property Information</Title>
          </Group>
          
          <SimpleGrid cols={2} spacing="md">
            <Stack gap="sm">
              <Box>
                <Text size="sm" c="dimmed">Property Address</Text>
                <Text fw={500}>{data.property.address}</Text>
              </Box>
              <Box>
                <Text size="sm" c="dimmed">Title Reference</Text>
                <Text fw={500}>{data.property.title}</Text>
              </Box>
              <Box>
                <Text size="sm" c="dimmed">Zoning</Text>
                <Text fw={500}>{data.property.zone}</Text>
              </Box>
            </Stack>
            
            <Stack gap="sm">
              <Box>
                <Text size="sm" c="dimmed">Lot/Plan</Text>
                <Text fw={500}>Lot {data.property.lotNumber} / {data.property.planNumber}</Text>
              </Box>
              <Box>
                <Text size="sm" c="dimmed">Land Size</Text>
                <Text fw={500}>{data.property.landSize}</Text>
              </Box>
              <Box>
                <Text size="sm" c="dimmed">Council</Text>
                <Text fw={500}>{data.property.council}</Text>
              </Box>
            </Stack>
          </SimpleGrid>
        </Card>

        {/* Council Information */}
        <Card p="md" withBorder>
          <Group gap="xs" mb="md">
            <IconBuilding size={20} />
            <Title order={4}>Council Information</Title>
          </Group>
          
          <SimpleGrid cols={2} spacing="md">
            <Stack gap="sm">
              <Box>
                <Text size="sm" c="dimmed">Council</Text>
                <Text fw={500}>{data.council.name}</Text>
              </Box>
              <Box>
                <Text size="sm" c="dimmed">Phone</Text>
                <Text fw={500}>{data.council.phone}</Text>
              </Box>
              <Box>
                <Text size="sm" c="dimmed">Address</Text>
                <Text fw={500}>{data.council.address}</Text>
              </Box>
            </Stack>
            
            <Box>
              <Text size="sm" c="dimmed" mb="xs">Annual Rates & Charges</Text>
              <Stack gap={4}>
                <Group justify="space-between">
                  <Text size="sm">Council Rates</Text>
                  <Text size="sm" fw={500}>${data.council.rates.annual.toLocaleString()}</Text>
                </Group>
                <Group justify="space-between">
                  <Text size="sm">Water Access</Text>
                  <Text size="sm" fw={500}>${data.council.rates.waterAccess.toLocaleString()}</Text>
                </Group>
                <Group justify="space-between">
                  <Text size="sm">Sewerage</Text>
                  <Text size="sm" fw={500}>${data.council.rates.sewerage.toLocaleString()}</Text>
                </Group>
                <Divider />
                <Group justify="space-between">
                  <Text size="sm" fw={500}>Total Annual</Text>
                  <Text size="sm" fw={700}>${(data.council.rates.annual + data.council.rates.waterAccess + data.council.rates.sewerage).toLocaleString()}</Text>
                </Group>
              </Stack>
            </Box>
          </SimpleGrid>
        </Card>

        {/* Searches & Conditions */}
        <Accordion defaultValue={["searches"]} multiple>
          <Accordion.Item value="searches">
            <Accordion.Control icon={<IconMapPin size={20} />}>
              Property Searches ({data.searches.length})
            </Accordion.Control>
            <Accordion.Panel>
              <Stack gap="md">
                {data.searches.map((search, idx) => (
                  <Card key={idx} p="sm" withBorder>
                    <Group justify="space-between" mb="xs">
                      <Text fw={500}>{search.name}</Text>
                      <Group gap="xs">
                        <Badge color={getStatusColor(search.status)} variant="light" size="sm">
                          {search.status}
                        </Badge>
                        <Badge variant="outline" size="sm">
                          ${search.cost}
                        </Badge>
                      </Group>
                    </Group>
                    
                    {search.date && (
                      <Text size="xs" c="dimmed" mb="xs">
                        Completed: {formatDate(search.date)}
                      </Text>
                    )}
                    
                    {search.notes && (
                      <Text size="sm" c="dimmed">{search.notes}</Text>
                    )}
                  </Card>
                ))}
                
                <Box mt="md">
                  <Group justify="space-between">
                    <Text fw={500}>Total Search Costs</Text>
                    <Text fw={700}>${data.searches.reduce((sum, s) => sum + s.cost, 0)}</Text>
                  </Group>
                </Box>
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="conditions">
            <Accordion.Control icon={<IconChecks size={20} />}>
              Contract Conditions ({data.conditions.length})
            </Accordion.Control>
            <Accordion.Panel>
              <Stack gap="md">
                {data.conditions.map((condition) => (
                  <Card key={condition.id} p="sm" withBorder>
                    <Group justify="space-between" mb="xs">
                      <Group gap="xs">
                        <Badge 
                          color={condition.type === "special" ? "blue" : "gray"} 
                          variant="outline" 
                          size="xs"
                        >
                          {condition.type}
                        </Badge>
                        <Text fw={500}>{condition.description}</Text>
                      </Group>
                      <Badge color={getStatusColor(condition.status)} variant="light" size="sm">
                        {condition.status}
                      </Badge>
                    </Group>
                    
                    {condition.dueDate && (
                      <Text size="xs" c="dimmed">
                        Due: {formatDate(condition.dueDate)}
                        {condition.status === "overdue" && (
                          <Text component="span" c="red" fw={500}> (OVERDUE)</Text>
                        )}
                      </Text>
                    )}
                  </Card>
                ))}
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>

        {/* Alerts */}
        {(overdueConditions.length > 0 || pendingSearches.length > 0) && (
          <Card p="md" withBorder bg="red.0">
            <Group gap="xs" mb="md">
              <IconAlertCircle size={20} color="var(--mantine-color-red-6)" />
              <Title order={4} c="red">Action Required</Title>
            </Group>
            
            <Stack gap="sm">
              {overdueConditions.map((condition) => (
                <Text key={condition.id} size="sm">
                  • <strong>OVERDUE:</strong> {condition.description} (Due: {condition.dueDate && formatDate(condition.dueDate)})
                </Text>
              ))}
              
              {pendingSearches.map((search, idx) => (
                <Text key={idx} size="sm">
                  • <strong>PENDING:</strong> {search.name} - {search.notes || "Awaiting completion"}
                </Text>
              ))}
            </Stack>
          </Card>
        )}
      </Stack>
    </Paper>
  );
}