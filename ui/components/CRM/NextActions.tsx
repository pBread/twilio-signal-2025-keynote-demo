import { 
  Paper, 
  Stack, 
  Text, 
  Title, 
  Group, 
  Badge, 
  Card,
  Timeline,
  Box,
  Button,
  Checkbox,
  ActionIcon,
  Tooltip
} from "@mantine/core";
import { 
  IconClipboardCheck,
  IconPhone,
  IconMail,
  IconFileText,
  IconCalendar,
  IconBuildingBank,
  IconUsers,
  IconAlertCircle,
  IconClock,
  IconArrowRight
} from "@tabler/icons-react";
import { useState } from "react";

interface ActionItem {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "critical";
  category: "documentation" | "communication" | "assessment" | "followup";
  dueDate?: Date;
  estimatedTime: string;
  completed: boolean;
  icon: React.ReactNode;
  actionType: "call" | "email" | "document" | "meeting" | "review";
}

const actionItems: ActionItem[] = [
  {
    id: "1",
    title: "Address Credit Card Debt",
    description: "Customer needs to pay down credit card utilisation from 75% to below 30% before loan application",
    priority: "critical",
    category: "assessment",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    estimatedTime: "Immediate",
    completed: false,
    icon: <IconAlertCircle size={20} />,
    actionType: "call"
  },
  {
    id: "2",
    title: "Schedule Pre-approval Application",
    description: "Book appointment to submit formal pre-approval application with required documentation",
    priority: "high",
    category: "documentation",
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    estimatedTime: "60 minutes",
    completed: false,
    icon: <IconCalendar size={20} />,
    actionType: "meeting"
  },
  {
    id: "3",
    title: "Employment Verification",
    description: "Obtain confirmation letter from HR regarding probation completion date and salary details",
    priority: "high",
    category: "documentation",
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    estimatedTime: "30 minutes",
    completed: false,
    icon: <IconFileText size={20} />,
    actionType: "document"
  },
  {
    id: "4",
    title: "Lender Comparison Review",
    description: "Present comparison of 3-4 lenders with current rates and features suitable for customer profile",
    priority: "medium",
    category: "communication",
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    estimatedTime: "45 minutes",
    completed: false,
    icon: <IconBuildingBank size={20} />,
    actionType: "call"
  },
  {
    id: "5",
    title: "Property Search Strategy",
    description: "Discuss property search timeline and market conditions in target suburbs",
    priority: "medium",
    category: "communication",
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    estimatedTime: "30 minutes",
    completed: false,
    icon: <IconUsers size={20} />,
    actionType: "call"
  },
  {
    id: "6",
    title: "Insurance Requirements Brief",
    description: "Send detailed information about required insurances and obtain quotes",
    priority: "low",
    category: "followup",
    dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
    estimatedTime: "15 minutes",
    completed: false,
    icon: <IconMail size={20} />,
    actionType: "email"
  }
];

const getPriorityColor = (priority: ActionItem["priority"]) => {
  switch (priority) {
    case "low": return "gray";
    case "medium": return "blue";
    case "high": return "orange";
    case "critical": return "red";
  }
};

const getCategoryColor = (category: ActionItem["category"]) => {
  switch (category) {
    case "documentation": return "blue";
    case "communication": return "green";
    case "assessment": return "orange";
    case "followup": return "purple";
  }
};

const getActionIcon = (actionType: ActionItem["actionType"]) => {
  switch (actionType) {
    case "call": return <IconPhone size={16} />;
    case "email": return <IconMail size={16} />;
    case "document": return <IconFileText size={16} />;
    case "meeting": return <IconCalendar size={16} />;
    case "review": return <IconClipboardCheck size={16} />;
  }
};

export function NextActions() {
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());
  
  const toggleCompletion = (actionId: string) => {
    const newCompleted = new Set(completedActions);
    if (newCompleted.has(actionId)) {
      newCompleted.delete(actionId);
    } else {
      newCompleted.add(actionId);
    }
    setCompletedActions(newCompleted);
  };

  const sortedActions = [...actionItems].sort((a, b) => {
    const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
    if (priorityDiff !== 0) return priorityDiff;
    
    if (a.dueDate && b.dueDate) {
      return a.dueDate.getTime() - b.dueDate.getTime();
    }
    return 0;
  });

  const criticalActions = sortedActions.filter(a => a.priority === "critical");
  const upcomingActions = sortedActions.filter(a => 
    a.dueDate && a.dueDate.getTime() < Date.now() + 7 * 24 * 60 * 60 * 1000 && a.priority !== "critical"
  );

  const formatDueDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
    
    const daysFromNow = Math.ceil((date.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));
    if (daysFromNow <= 7) return `In ${daysFromNow} days`;
    
    return date.toLocaleDateString("en-AU", { day: "numeric", month: "short" });
  };

  return (
    <Paper p="lg" shadow="sm" radius="md">
      <Title order={3} mb="md">Next Actions & Recommendations</Title>
      
      <Stack gap="lg">
        {/* Action Summary */}
        <Group grow>
          <Card p="md" withBorder>
            <Group justify="space-between">
              <Box>
                <Text size="sm" c="dimmed">Critical Actions</Text>
                <Text size="xl" fw={700} c="red">{criticalActions.length}</Text>
              </Box>
              <IconAlertCircle size={24} color="var(--mantine-color-red-6)" />
            </Group>
          </Card>
          
          <Card p="md" withBorder>
            <Group justify="space-between">
              <Box>
                <Text size="sm" c="dimmed">Due This Week</Text>
                <Text size="xl" fw={700} c="orange">{upcomingActions.length}</Text>
              </Box>
              <IconClock size={24} color="var(--mantine-color-orange-6)" />
            </Group>
          </Card>
          
          <Card p="md" withBorder>
            <Group justify="space-between">
              <Box>
                <Text size="sm" c="dimmed">Total Actions</Text>
                <Text size="xl" fw={700}>{actionItems.length}</Text>
              </Box>
              <IconClipboardCheck size={24} color="var(--mantine-color-blue-6)" />
            </Group>
          </Card>
        </Group>

        {/* Critical Actions Alert */}
        {criticalActions.length > 0 && (
          <Card p="md" withBorder bg="red.0">
            <Group gap="xs" mb="md">
              <IconAlertCircle size={20} color="var(--mantine-color-red-6)" />
              <Title order={4} c="red">Critical Actions Required</Title>
            </Group>
            <Stack gap="md">
              {criticalActions.map((action) => (
                <Card key={action.id} p="sm" withBorder>
                  <Group justify="space-between" mb="xs">
                    <Group gap="xs">
                      <Checkbox
                        checked={completedActions.has(action.id)}
                        onChange={() => toggleCompletion(action.id)}
                      />
                      <Box c="red">{action.icon}</Box>
                      <Text fw={500}>{action.title}</Text>
                    </Group>
                    <Group gap="xs">
                      <Badge size="xs" color="red" variant="filled">
                        CRITICAL
                      </Badge>
                      {action.dueDate && (
                        <Badge size="xs" variant="light">
                          {formatDueDate(action.dueDate)}
                        </Badge>
                      )}
                    </Group>
                  </Group>
                  <Text size="sm" c="dimmed" pl="lg">
                    {action.description}
                  </Text>
                </Card>
              ))}
            </Stack>
          </Card>
        )}

        {/* Action Timeline */}
        <Card p="md" withBorder>
          <Title order={4} mb="md">Action Timeline</Title>
          
          <Timeline active={-1} bulletSize={24} lineWidth={2}>
            {sortedActions.map((action) => (
              <Timeline.Item
                key={action.id}
                bullet={action.icon}
                title={
                  <Group gap="xs">
                    <Checkbox
                      checked={completedActions.has(action.id)}
                      onChange={() => toggleCompletion(action.id)}
                      size="sm"
                    />
                    <Text fw={500} td={completedActions.has(action.id) ? "line-through" : "none"}>
                      {action.title}
                    </Text>
                  </Group>
                }
              >
                <Group gap="xs" mb="xs">
                  <Badge 
                    size="xs" 
                    color={getPriorityColor(action.priority)}
                    variant="light"
                    style={{ textTransform: "capitalize" }}
                  >
                    {action.priority}
                  </Badge>
                  <Badge 
                    size="xs" 
                    color={getCategoryColor(action.category)}
                    variant="light"
                    style={{ textTransform: "capitalize" }}
                  >
                    {action.category}
                  </Badge>
                  <Group gap={4}>
                    {getActionIcon(action.actionType)}
                    <Text size="xs" c="dimmed" style={{ textTransform: "capitalize" }}>
                      {action.actionType}
                    </Text>
                  </Group>
                </Group>
                
                <Text size="sm" c="dimmed" mb="xs">
                  {action.description}
                </Text>
                
                <Group gap="md">
                  {action.dueDate && (
                    <Group gap="xs">
                      <IconCalendar size={14} />
                      <Text size="xs">Due: {formatDueDate(action.dueDate)}</Text>
                    </Group>
                  )}
                  <Group gap="xs">
                    <IconClock size={14} />
                    <Text size="xs">Est: {action.estimatedTime}</Text>
                  </Group>
                </Group>
                
                <Group gap="xs" mt="sm">
                  <Button size="xs" variant="light" leftSection={getActionIcon(action.actionType)}>
                    Take Action
                  </Button>
                  <Tooltip label="Mark as priority">
                    <ActionIcon size="sm" variant="subtle">
                      <IconArrowRight size={16} />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              </Timeline.Item>
            ))}
          </Timeline>
        </Card>

        {/* Quick Actions */}
        <Card p="md" withBorder>
          <Title order={4} mb="md">Quick Actions</Title>
          <Group gap="md">
            <Button leftSection={<IconPhone size={16} />} variant="filled">
              Call Customer
            </Button>
            <Button leftSection={<IconMail size={16} />} variant="outline">
              Send Email
            </Button>
            <Button leftSection={<IconFileText size={16} />} variant="outline">
              Generate Report
            </Button>
            <Button leftSection={<IconCalendar size={16} />} variant="outline">
              Schedule Meeting
            </Button>
          </Group>
        </Card>
        
        {/* Progress Summary */}
        <Card p="md" withBorder bg="green.0">
          <Group justify="space-between">
            <Box>
              <Text fw={500} mb="xs">Application Progress</Text>
              <Text size="sm" c="dimmed">
                Complete critical actions to move to pre-approval stage
              </Text>
            </Box>
            <Box ta="right">
              <Text size="lg" fw={700} c="green">
                {Math.round((completedActions.size / actionItems.length) * 100)}%
              </Text>
              <Text size="sm" c="dimmed">Complete</Text>
            </Box>
          </Group>
        </Card>
      </Stack>
    </Paper>
  );
}