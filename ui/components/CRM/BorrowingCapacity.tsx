import { 
  Paper, 
  Stack, 
  Text, 
  Title, 
  Group, 
  Badge, 
  Card,
  Progress,
  SimpleGrid,
  Box,
  Divider,
  ActionIcon,
  Tooltip
} from "@mantine/core";
import { IconCreditCard, IconTrendingUp, IconTrendingDown, IconInfoCircle } from "@tabler/icons-react";

interface ExpenseItem {
  id: string;
  category: string;
  description: string;
  amount: number;
  type: "current" | "potential";
  frequency: "weekly" | "monthly" | "annually";
}

const expenseData: ExpenseItem[] = [
  // Current Expenses
  {
    id: "1",
    category: "Housing",
    description: "Current rent",
    amount: 2400,
    type: "current",
    frequency: "monthly"
  },
  {
    id: "2", 
    category: "Living",
    description: "Groceries & utilities",
    amount: 800,
    type: "current",
    frequency: "monthly"
  },
  {
    id: "3",
    category: "Transport",
    description: "Car loan & fuel",
    amount: 650,
    type: "current",
    frequency: "monthly"
  },
  {
    id: "4",
    category: "Insurance",
    description: "Health & car insurance",
    amount: 320,
    type: "current",
    frequency: "monthly"
  },
  {
    id: "5",
    category: "Personal",
    description: "Entertainment & dining",
    amount: 500,
    type: "current",
    frequency: "monthly"
  },
  
  // Potential Future Expenses
  {
    id: "6",
    category: "Education",
    description: "Private school fees (future child)",
    amount: 15000,
    type: "potential",
    frequency: "annually"
  },
  {
    id: "7",
    category: "Healthcare",
    description: "Additional health costs (family)",
    amount: 200,
    type: "potential", 
    frequency: "monthly"
  },
  {
    id: "8",
    category: "Childcare",
    description: "Daycare costs (future child)",
    amount: 450,
    type: "potential",
    frequency: "weekly"
  },
  {
    id: "9",
    category: "Housing",
    description: "Home maintenance & upgrades",
    amount: 5000,
    type: "potential",
    frequency: "annually"
  }
];

const monthlyIncome = 8500;
const currentMonthlyExpenses = expenseData
  .filter(item => item.type === "current")
  .reduce((total, item) => {
    if (item.frequency === "weekly") return total + (item.amount * 52 / 12);
    if (item.frequency === "annually") return total + (item.amount / 12);
    return total + item.amount;
  }, 0);

const potentialMonthlyExpenses = expenseData
  .filter(item => item.type === "potential")
  .reduce((total, item) => {
    if (item.frequency === "weekly") return total + (item.amount * 52 / 12);
    if (item.frequency === "annually") return total + (item.amount / 12);
    return total + item.amount;
  }, 0);

const currentDisposableIncome = monthlyIncome - currentMonthlyExpenses;
const futureDisposableIncome = monthlyIncome - currentMonthlyExpenses - potentialMonthlyExpenses;

const formatCurrency = (amount: number) => `$${amount.toLocaleString()}`;

const normalizeToMonthly = (amount: number, frequency: ExpenseItem["frequency"]) => {
  if (frequency === "weekly") return amount * 52 / 12;
  if (frequency === "annually") return amount / 12;
  return amount;
};

export function BorrowingCapacity() {
  const currentExpensesByCategory = expenseData
    .filter(item => item.type === "current")
    .reduce((acc, item) => {
      const category = item.category;
      if (!acc[category]) acc[category] = 0;
      acc[category] += normalizeToMonthly(item.amount, item.frequency);
      return acc;
    }, {} as Record<string, number>);

  const potentialExpensesByCategory = expenseData
    .filter(item => item.type === "potential")
    .reduce((acc, item) => {
      const category = item.category;
      if (!acc[category]) acc[category] = 0;
      acc[category] += normalizeToMonthly(item.amount, item.frequency);
      return acc;
    }, {} as Record<string, number>);

  return (
    <Paper p="lg" shadow="sm" radius="md">
      <Title order={3} mb="md">Borrowing Capacity Assessment</Title>
      
      <Stack gap="lg">
        {/* Income Overview */}
        <Card p="md" withBorder>
          <Group justify="space-between" mb="sm">
            <Text fw={500}>Monthly Income</Text>
            <Badge color="green" variant="light" size="lg">
              {formatCurrency(monthlyIncome)}
            </Badge>
          </Group>
          
          <SimpleGrid cols={2} spacing="md" mt="md">
            <Box>
              <Text size="sm" c="dimmed" mb="xs">Current Disposable Income</Text>
              <Group gap="xs">
                <IconTrendingUp size={16} color="green" />
                <Text fw={500} c="green">{formatCurrency(currentDisposableIncome)}</Text>
              </Group>
            </Box>
            
            <Box>
              <Text size="sm" c="dimmed" mb="xs">Future Disposable Income</Text>
              <Group gap="xs">
                <IconTrendingDown size={16} color="orange" />
                <Text fw={500} c="orange">{formatCurrency(futureDisposableIncome)}</Text>
              </Group>
            </Box>
          </SimpleGrid>
        </Card>

        {/* Current Expenses */}
        <Card p="md" withBorder>
          <Group justify="space-between" mb="md">
            <Group gap="xs">
              <IconCreditCard size={20} />
              <Title order={4}>Current Monthly Expenses</Title>
            </Group>
            <Badge variant="light">
              {formatCurrency(currentMonthlyExpenses)}
            </Badge>
          </Group>

          <Stack gap="sm">
            {Object.entries(currentExpensesByCategory).map(([category, amount]) => (
              <Box key={category}>
                <Group justify="space-between" mb="xs">
                  <Text size="sm" fw={500}>{category}</Text>
                  <Text size="sm">{formatCurrency(amount)}</Text>
                </Group>
                <Progress 
                  value={(amount / currentMonthlyExpenses) * 100} 
                  size="sm"
                  color="blue"
                />
              </Box>
            ))}
          </Stack>

          <Divider my="md" />

          <Group justify="space-between">
            <Text fw={500}>Remaining Income</Text>
            <Text fw={500} c="green">{formatCurrency(currentDisposableIncome)}</Text>
          </Group>
        </Card>

        {/* Potential Future Expenses */}
        <Card p="md" withBorder>
          <Group justify="space-between" mb="md">
            <Group gap="xs">
              <Title order={4}>Potential Future Expenses</Title>
              <Tooltip label="Projected expenses for family planning and lifestyle changes">
                <ActionIcon variant="subtle" size="sm">
                  <IconInfoCircle size={16} />
                </ActionIcon>
              </Tooltip>
            </Group>
            <Badge color="orange" variant="light">
              +{formatCurrency(potentialMonthlyExpenses)}
            </Badge>
          </Group>

          <Stack gap="md">
            {expenseData
              .filter(item => item.type === "potential")
              .map(item => (
                <Group key={item.id} justify="space-between" p="sm" style={{ 
                  border: "1px solid var(--mantine-color-gray-3)", 
                  borderRadius: "var(--mantine-radius-sm)" 
                }}>
                  <Box>
                    <Text size="sm" fw={500}>{item.description}</Text>
                    <Text size="xs" c="dimmed">{item.category}</Text>
                  </Box>
                  <Box ta="right">
                    <Text size="sm" fw={500}>
                      {formatCurrency(item.amount)}
                    </Text>
                    <Text size="xs" c="dimmed">{item.frequency}</Text>
                  </Box>
                </Group>
              ))
            }
          </Stack>

          <Divider my="md" />

          <Group justify="space-between">
            <Text fw={500}>Future Remaining Income</Text>
            <Text fw={500} c={futureDisposableIncome > 0 ? "green" : "red"}>
              {formatCurrency(futureDisposableIncome)}
            </Text>
          </Group>
        </Card>

        {/* Borrowing Capacity Summary */}
        <Card p="md" withBorder bg="gray.0">
          <Title order={4} mb="md">Estimated Borrowing Capacity</Title>
          
          <SimpleGrid cols={2} spacing="md">
            <Box>
              <Text size="sm" c="dimmed" mb="xs">Current Scenario</Text>
              <Text size="xl" fw={700} c="green">
                {formatCurrency(currentDisposableIncome * 5.5)} {/* Rough 5.5x multiplier */}
              </Text>
              <Text size="xs" c="dimmed">
                Based on {formatCurrency(currentDisposableIncome)}/month disposable income
              </Text>
            </Box>
            
            <Box>
              <Text size="sm" c="dimmed" mb="xs">Future Scenario</Text>
              <Text size="xl" fw={700} c="orange">
                {formatCurrency(Math.max(0, futureDisposableIncome * 5.5))}
              </Text>
              <Text size="xs" c="dimmed">
                With potential future expenses factored in
              </Text>
            </Box>
          </SimpleGrid>

          <Text size="xs" c="dimmed" mt="md" fs="italic">
            * Estimates based on Australian lending criteria. Actual borrowing capacity may vary based on lender assessment, credit history, and current interest rates.
          </Text>
        </Card>
      </Stack>
    </Paper>
  );
}