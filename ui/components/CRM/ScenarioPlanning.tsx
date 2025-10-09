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
  Select,
  NumberInput,
  Divider
} from "@mantine/core";
import { IconTrendingDown, IconCalculator, IconChartLine } from "@tabler/icons-react";
import { useState } from "react";

interface LoanScenario {
  id: string;
  name: string;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  monthlyPayment: number;
  totalInterest: number;
}

const baseScenarios: LoanScenario[] = [
  {
    id: "1",
    name: "Standard Variable",
    loanAmount: 650000,
    interestRate: 6.5,
    loanTerm: 30,
    monthlyPayment: 4107,
    totalInterest: 828520
  },
  {
    id: "2", 
    name: "Fixed 3 Years",
    loanAmount: 650000,
    interestRate: 5.9,
    loanTerm: 30,
    monthlyPayment: 3858,
    totalInterest: 738880
  },
  {
    id: "3",
    name: "Fixed 5 Years",
    loanAmount: 650000,
    interestRate: 6.1,
    loanTerm: 30,
    monthlyPayment: 3932,
    totalInterest: 765520
  }
];

// Generate sample data points for loan balance over time
const generateLoanBalance = (scenario: LoanScenario) => {
  const monthlyRate = scenario.interestRate / 100 / 12;
  const numPayments = scenario.loanTerm * 12;
  const balance: { year: number; balance: number; principalPaid: number; interestPaid: number }[] = [];
  
  let currentBalance = scenario.loanAmount;
  let totalPrincipal = 0;
  let totalInterest = 0;
  
  for (let year = 0; year <= scenario.loanTerm; year++) {
    const month = year * 12;
    
    if (year > 0) {
      // Calculate 12 months of payments
      for (let i = 0; i < 12 && month + i < numPayments; i++) {
        const interestPayment = currentBalance * monthlyRate;
        const principalPayment = scenario.monthlyPayment - interestPayment;
        
        currentBalance -= principalPayment;
        totalPrincipal += principalPayment;
        totalInterest += interestPayment;
      }
    }
    
    balance.push({
      year,
      balance: Math.max(0, currentBalance),
      principalPaid: totalPrincipal,
      interestPaid: totalInterest
    });
  }
  
  return balance;
};

const SimpleChart = ({ data, scenario }: { 
  data: ReturnType<typeof generateLoanBalance>, 
  scenario: LoanScenario 
}) => {
  const maxBalance = scenario.loanAmount;
  
  return (
    <Box style={{ position: "relative", height: 200 }}>
      <svg width="100%" height="100%" viewBox="0 0 400 160" style={{ overflow: "visible" }}>
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map(percent => (
          <g key={percent}>
            <line 
              x1="40" 
              y1={20 + (percent / 100) * 120} 
              x2="380" 
              y2={20 + (percent / 100) * 120}
              stroke="#e9ecef" 
              strokeWidth="1"
            />
            <text 
              x="35" 
              y={25 + (percent / 100) * 120} 
              textAnchor="end" 
              fontSize="10" 
              fill="#868e96"
            >
              ${Math.round((maxBalance * (100 - percent) / 100) / 1000)}k
            </text>
          </g>
        ))}
        
        {/* Balance line */}
        <polyline
          points={data.map((point, index) => 
            `${40 + (index / (data.length - 1)) * 340},${140 - (point.balance / maxBalance) * 120}`
          ).join(" ")}
          fill="none"
          stroke="#339af0"
          strokeWidth="2"
        />
        
        {/* Data points */}
        {data.filter((_, i) => i % 5 === 0).map((point, index) => (
          <circle
            key={index}
            cx={40 + (data.indexOf(point) / (data.length - 1)) * 340}
            cy={140 - (point.balance / maxBalance) * 120}
            r="3"
            fill="#339af0"
          />
        ))}
        
        {/* X-axis labels */}
        {data.filter((_, i) => i % 5 === 0).map((point, index) => (
          <text
            key={index}
            x={40 + (data.indexOf(point) / (data.length - 1)) * 340}
            y="155"
            textAnchor="middle"
            fontSize="10"
            fill="#868e96"
          >
            {point.year}
          </text>
        ))}
      </svg>
      
      <Text size="xs" c="dimmed" ta="center" mt="xs">
        Years
      </Text>
    </Box>
  );
};

export function ScenarioPlanning() {
  const [selectedScenario, setSelectedScenario] = useState("1");
  const [customRate, setCustomRate] = useState<number | string>(6.5);
  
  const currentScenario = baseScenarios.find(s => s.id === selectedScenario) || baseScenarios[0];
  const balanceData = generateLoanBalance(currentScenario);
  
  // Calculate custom scenario if rate is changed
  const customScenario: LoanScenario = {
    ...currentScenario,
    interestRate: typeof customRate === "number" ? customRate : parseFloat(customRate as string) || 6.5
  };
  
  // Recalculate monthly payment for custom rate
  if (typeof customRate === "number" && customRate !== currentScenario.interestRate) {
    const monthlyRate = customRate / 100 / 12;
    const numPayments = customScenario.loanTerm * 12;
    const monthlyPayment = customScenario.loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
      (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    customScenario.monthlyPayment = Math.round(monthlyPayment);
    customScenario.totalInterest = Math.round((monthlyPayment * numPayments) - customScenario.loanAmount);
  }
  
  const customBalanceData = generateLoanBalance(customScenario);
  const fiveYearMark = balanceData.find(d => d.year === 5);
  const tenYearMark = balanceData.find(d => d.year === 10);

  return (
    <Paper p="lg" shadow="sm" radius="md">
      <Title order={3} mb="md">Scenario Planning</Title>
      
      <Stack gap="lg">
        {/* Scenario Selector */}
        <Card p="md" withBorder>
          <Group justify="space-between" mb="md">
            <Group gap="xs">
              <IconCalculator size={20} />
              <Text fw={500}>Loan Scenarios</Text>
            </Group>
            <Select
              value={selectedScenario}
              onChange={(value) => value && setSelectedScenario(value)}
              data={baseScenarios.map(s => ({ value: s.id, label: s.name }))}
              w={200}
            />
          </Group>
          
          <SimpleGrid cols={3} spacing="md">
            <Box>
              <Text size="sm" c="dimmed">Loan Amount</Text>
              <Text fw={500}>${currentScenario.loanAmount.toLocaleString()}</Text>
            </Box>
            <Box>
              <Text size="sm" c="dimmed">Interest Rate</Text>
              <Text fw={500}>{currentScenario.interestRate}% p.a.</Text>
            </Box>
            <Box>
              <Text size="sm" c="dimmed">Loan Term</Text>
              <Text fw={500}>{currentScenario.loanTerm} years</Text>
            </Box>
          </SimpleGrid>
        </Card>

        {/* Loan Balance Burn Down Chart */}
        <Card p="md" withBorder>
          <Group justify="space-between" mb="md">
            <Group gap="xs">
              <IconTrendingDown size={20} />
              <Title order={4}>Loan Balance Over Time</Title>
            </Group>
            <Badge variant="light">
              ${currentScenario.monthlyPayment.toLocaleString()}/month
            </Badge>
          </Group>

          <SimpleChart data={balanceData} scenario={currentScenario} />
          
          <SimpleGrid cols={3} spacing="md" mt="md">
            <Box ta="center">
              <Text size="sm" c="dimmed">5 Year Balance</Text>
              <Text fw={500}>
                ${fiveYearMark?.balance.toLocaleString() || "0"}
              </Text>
            </Box>
            <Box ta="center">
              <Text size="sm" c="dimmed">10 Year Balance</Text>
              <Text fw={500}>
                ${tenYearMark?.balance.toLocaleString() || "0"}
              </Text>
            </Box>
            <Box ta="center">
              <Text size="sm" c="dimmed">Total Interest</Text>
              <Text fw={500} c="orange">
                ${currentScenario.totalInterest.toLocaleString()}
              </Text>
            </Box>
          </SimpleGrid>
        </Card>

        {/* Interest Rate Comparison */}
        <Card p="md" withBorder>
          <Group justify="space-between" mb="md">
            <Group gap="xs">
              <IconChartLine size={20} />
              <Title order={4}>Interest Rate Impact</Title>
            </Group>
            <Group gap="md">
              <Text size="sm">Custom Rate:</Text>
              <NumberInput
                value={customRate}
                onChange={setCustomRate}
                suffix="% p.a."
                min={1}
                max={15}
                step={0.1}
                w={120}
                size="sm"
              />
            </Group>
          </Group>

          {typeof customRate === "number" && customRate !== currentScenario.interestRate && (
            <>
              <SimpleChart data={customBalanceData} scenario={customScenario} />
              
              <Divider my="md" />
              
              <SimpleGrid cols={2} spacing="md">
                <Card p="md" withBorder>
                  <Text size="sm" c="dimmed" mb="xs">Original Scenario</Text>
                  <Stack gap="xs">
                    <Group justify="space-between">
                      <Text size="sm">Monthly Payment</Text>
                      <Text size="sm" fw={500}>${currentScenario.monthlyPayment.toLocaleString()}</Text>
                    </Group>
                    <Group justify="space-between">
                      <Text size="sm">Total Interest</Text>
                      <Text size="sm" fw={500}>${currentScenario.totalInterest.toLocaleString()}</Text>
                    </Group>
                  </Stack>
                </Card>
                
                <Card p="md" withBorder>
                  <Text size="sm" c="dimmed" mb="xs">Custom Rate Scenario</Text>
                  <Stack gap="xs">
                    <Group justify="space-between">
                      <Text size="sm">Monthly Payment</Text>
                      <Text size="sm" fw={500} c={customScenario.monthlyPayment > currentScenario.monthlyPayment ? "red" : "green"}>
                        ${customScenario.monthlyPayment.toLocaleString()}
                      </Text>
                    </Group>
                    <Group justify="space-between">
                      <Text size="sm">Total Interest</Text>
                      <Text size="sm" fw={500} c={customScenario.totalInterest > currentScenario.totalInterest ? "red" : "green"}>
                        ${customScenario.totalInterest.toLocaleString()}
                      </Text>
                    </Group>
                  </Stack>
                </Card>
              </SimpleGrid>
              
              <Box mt="md" p="sm" bg="blue.0" style={{ borderRadius: "var(--mantine-radius-sm)" }}>
                <Text size="sm" fw={500} mb="xs">Impact Comparison</Text>
                <Group justify="space-between">
                  <Text size="sm">Monthly Difference</Text>
                  <Text size="sm" fw={500} c={customScenario.monthlyPayment > currentScenario.monthlyPayment ? "red" : "green"}>
                    {customScenario.monthlyPayment > currentScenario.monthlyPayment ? "+" : ""}
                    ${Math.abs(customScenario.monthlyPayment - currentScenario.monthlyPayment).toLocaleString()}
                  </Text>
                </Group>
                <Group justify="space-between">
                  <Text size="sm">Total Interest Difference</Text>
                  <Text size="sm" fw={500} c={customScenario.totalInterest > currentScenario.totalInterest ? "red" : "green"}>
                    {customScenario.totalInterest > currentScenario.totalInterest ? "+" : ""}
                    ${Math.abs(customScenario.totalInterest - currentScenario.totalInterest).toLocaleString()}
                  </Text>
                </Group>
              </Box>
            </>
          )}
        </Card>

        {/* Key Insights */}
        <Card p="md" withBorder bg="gray.0">
          <Title order={4} mb="md">Key Insights</Title>
          <Stack gap="sm">
            <Group gap="xs">
              <Badge size="sm" variant="dot" color="blue">Principal</Badge>
              <Text size="sm">
                After 5 years: ${((fiveYearMark?.principalPaid || 0)).toLocaleString()} principal paid
              </Text>
            </Group>
            <Group gap="xs">
              <Badge size="sm" variant="dot" color="orange">Interest</Badge>
              <Text size="sm">
                First 5 years interest: ${((fiveYearMark?.interestPaid || 0)).toLocaleString()}
              </Text>
            </Group>
            <Group gap="xs">
              <Badge size="sm" variant="dot" color="green">Savings</Badge>
              <Text size="sm">
                0.5% rate reduction saves ~${Math.round((currentScenario.totalInterest * 0.08)).toLocaleString()} over loan term
              </Text>
            </Group>
          </Stack>
        </Card>
      </Stack>
    </Paper>
  );
}