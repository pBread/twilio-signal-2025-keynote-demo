import { 
  Paper, 
  Stack, 
  Text, 
  Title, 
  Group, 
  Badge, 
  Card,
  Table,
  Box,
  Tooltip,
  ActionIcon,
  Progress
} from "@mantine/core";
import { 
  IconAlertTriangle, 
  IconGasStation, 
  IconTrendingUp, 
  IconCreditCard,
  IconHome,
  IconBriefcase,
  IconInfoCircle,
  IconExclamationMark
} from "@tabler/icons-react";

interface RiskFactor {
  id: string;
  category: "economic" | "personal" | "market" | "regulatory";
  title: string;
  description: string;
  impact: "low" | "medium" | "high";
  likelihood: "low" | "medium" | "high";
  trend: "stable" | "increasing" | "decreasing";
  mitigation?: string;
  icon: React.ReactNode;
}

const riskFactors: RiskFactor[] = [
  {
    id: "1",
    category: "economic",
    title: "Rising Fuel Costs",
    description: "Petrol prices have increased 15% in the last 6 months, affecting monthly transport budget",
    impact: "medium",
    likelihood: "high",
    trend: "increasing",
    mitigation: "Consider public transport or hybrid vehicle options",
    icon: <IconGasStation size={20} />
  },
  {
    id: "2",
    category: "economic", 
    title: "Interest Rate Risk",
    description: "RBA may increase cash rate by 0.25-0.5% in next 12 months based on inflation trends",
    impact: "high",
    likelihood: "medium",
    trend: "increasing",
    mitigation: "Consider fixed rate options or larger deposit to reduce exposure",
    icon: <IconTrendingUp size={20} />
  },
  {
    id: "3",
    category: "personal",
    title: "Credit Card Utilisation",
    description: "Current credit limit utilisation at 75% - may impact credit score and serviceability",
    impact: "medium",
    likelihood: "high",
    trend: "stable",
    mitigation: "Pay down existing debt before settlement or consider consolidation",
    icon: <IconCreditCard size={20} />
  },
  {
    id: "4",
    category: "market",
    title: "Property Market Softening",
    description: "Target suburbs showing 3-5% price decline in last quarter",
    impact: "medium",
    likelihood: "medium",
    trend: "increasing",
    mitigation: "Consider larger deposit or wait for market stabilisation",
    icon: <IconHome size={20} />
  },
  {
    id: "5",
    category: "personal",
    title: "Employment Stability",
    description: "Currently in probationary period - may affect loan approval confidence",
    impact: "high",
    likelihood: "low",
    trend: "decreasing",
    mitigation: "Wait until probation completion or provide additional income evidence",
    icon: <IconBriefcase size={20} />
  },
  {
    id: "6",
    category: "regulatory",
    title: "APRA Lending Guidelines",
    description: "Tightening of serviceability assessments and deposit requirements",
    impact: "medium",
    likelihood: "medium",
    trend: "stable",
    mitigation: "Ensure comprehensive documentation and consider specialist lenders",
    icon: <IconExclamationMark size={20} />
  }
];

const getRiskColor = (level: "low" | "medium" | "high") => {
  switch (level) {
    case "low": return "green";
    case "medium": return "orange";
    case "high": return "red";
  }
};

const getTrendColor = (trend: "stable" | "increasing" | "decreasing") => {
  switch (trend) {
    case "stable": return "gray";
    case "increasing": return "red";
    case "decreasing": return "green";
  }
};

const getCategoryColor = (category: RiskFactor["category"]) => {
  switch (category) {
    case "economic": return "blue";
    case "personal": return "purple";
    case "market": return "orange";
    case "regulatory": return "gray";
  }
};

const calculateRiskScore = (factors: RiskFactor[]) => {
  const scores = { low: 1, medium: 2, high: 3 };
  const totalScore = factors.reduce((sum, factor) => {
    return sum + (scores[factor.impact] * scores[factor.likelihood]);
  }, 0);
  const maxScore = factors.length * 9; // 3 * 3
  return Math.round((totalScore / maxScore) * 100);
};

export function BorrowerRisks() {
  const overallRiskScore = calculateRiskScore(riskFactors);
  const highRiskFactors = riskFactors.filter(f => f.impact === "high" || f.likelihood === "high");
  const increasingTrends = riskFactors.filter(f => f.trend === "increasing");

  const riskScoreColor = overallRiskScore > 70 ? "red" : overallRiskScore > 40 ? "orange" : "green";

  return (
    <Paper p="lg" shadow="sm" radius="md">
      <Title order={3} mb="md">Borrower Risk Assessment</Title>
      
      <Stack gap="lg">
        {/* Risk Overview */}
        <Card p="md" withBorder>
          <Group justify="space-between" mb="md">
            <Group gap="xs">
              <IconAlertTriangle size={20} />
              <Text fw={500}>Overall Risk Profile</Text>
            </Group>
            <Badge size="lg" color={riskScoreColor} variant="light">
              {overallRiskScore}% Risk Score
            </Badge>
          </Group>

          <Progress value={overallRiskScore} color={riskScoreColor} size="lg" mb="md" />
          
          <Group grow>
            <Box ta="center">
              <Text size="sm" c="dimmed">High Priority Risks</Text>
              <Text size="xl" fw={700} c="red">{highRiskFactors.length}</Text>
            </Box>
            <Box ta="center">
              <Text size="sm" c="dimmed">Increasing Trends</Text>
              <Text size="xl" fw={700} c="orange">{increasingTrends.length}</Text>
            </Box>
            <Box ta="center">
              <Text size="sm" c="dimmed">Total Factors</Text>
              <Text size="xl" fw={700}>{riskFactors.length}</Text>
            </Box>
          </Group>
        </Card>

        {/* Risk Factors Table */}
        <Card p="md" withBorder>
          <Title order={4} mb="md">Risk Factors Analysis</Title>
          
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Risk Factor</Table.Th>
                <Table.Th>Category</Table.Th>
                <Table.Th>Impact</Table.Th>
                <Table.Th>Likelihood</Table.Th>
                <Table.Th>Trend</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {riskFactors.map((risk) => (
                <Table.Tr key={risk.id}>
                  <Table.Td>
                    <Group gap="xs">
                      <Box c={getCategoryColor(risk.category)}>
                        {risk.icon}
                      </Box>
                      <Box>
                        <Text size="sm" fw={500}>{risk.title}</Text>
                        <Text size="xs" c="dimmed" style={{ maxWidth: 200 }}>
                          {risk.description}
                        </Text>
                      </Box>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Badge 
                      size="sm" 
                      variant="light" 
                      color={getCategoryColor(risk.category)}
                      style={{ textTransform: "capitalize" }}
                    >
                      {risk.category}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Badge 
                      size="sm" 
                      color={getRiskColor(risk.impact)}
                      variant="light"
                      style={{ textTransform: "capitalize" }}
                    >
                      {risk.impact}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Badge 
                      size="sm" 
                      color={getRiskColor(risk.likelihood)}
                      variant="light"
                      style={{ textTransform: "capitalize" }}
                    >
                      {risk.likelihood}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <Badge 
                        size="sm" 
                        color={getTrendColor(risk.trend)}
                        variant="light"
                        style={{ textTransform: "capitalize" }}
                      >
                        {risk.trend}
                      </Badge>
                      {risk.trend === "increasing" && (
                        <IconTrendingUp size={14} color="var(--mantine-color-red-6)" />
                      )}
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    {risk.mitigation && (
                      <Tooltip label={risk.mitigation} multiline w={300}>
                        <ActionIcon variant="subtle" size="sm">
                          <IconInfoCircle size={16} />
                        </ActionIcon>
                      </Tooltip>
                    )}
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Card>

        {/* Priority Actions */}
        <Card p="md" withBorder bg="red.0">
          <Title order={4} mb="md" c="red">Priority Risk Mitigations</Title>
          <Stack gap="md">
            {highRiskFactors.map((risk) => (
              <Card key={risk.id} p="sm" withBorder>
                <Group gap="xs" mb="xs">
                  <Box c={getCategoryColor(risk.category)}>
                    {risk.icon}
                  </Box>
                  <Text fw={500}>{risk.title}</Text>
                  <Badge size="xs" color="red" variant="light">
                    High Priority
                  </Badge>
                </Group>
                {risk.mitigation && (
                  <Text size="sm" c="dimmed">
                    <strong>Recommended Action:</strong> {risk.mitigation}
                  </Text>
                )}
              </Card>
            ))}
          </Stack>
        </Card>

        {/* Risk Categories Summary */}
        <Card p="md" withBorder>
          <Title order={4} mb="md">Risk by Category</Title>
          <Group grow>
            {["economic", "personal", "market", "regulatory"].map(category => {
              const categoryRisks = riskFactors.filter(r => r.category === category);
              const categoryScore = categoryRisks.length > 0 ? calculateRiskScore(categoryRisks) : 0;
              
              return (
                <Box key={category} ta="center">
                  <Text size="sm" c="dimmed" mb="xs" tt="capitalize">{category}</Text>
                  <Progress 
                    value={categoryScore} 
                    color={categoryScore > 70 ? "red" : categoryScore > 40 ? "orange" : "green"}
                    size="lg" 
                    mb="xs"
                  />
                  <Text size="xs" fw={500}>{categoryScore}%</Text>
                  <Text size="xs" c="dimmed">{categoryRisks.length} factors</Text>
                </Box>
              );
            })}
          </Group>
        </Card>
      </Stack>
    </Paper>
  );
}