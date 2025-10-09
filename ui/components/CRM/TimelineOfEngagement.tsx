import { Paper, Stack, Text, Title, Group, Avatar, Box, Badge } from "@mantine/core";
import { IconCalculator, IconHome, IconCreditCard } from "@tabler/icons-react";

interface TimelineEvent {
  id: string;
  type: "loan-calculator" | "mortgage-calculator" | "borrowing-capacity";
  timestamp: Date;
  description: string;
  duration?: string;
}

const mockEvents: TimelineEvent[] = [
  {
    id: "1",
    type: "loan-calculator",
    timestamp: new Date("2025-10-15T14:30:00"),
    description: "Viewed Loan Calculator - Estimated $650,000 borrowing capacity",
    duration: "3m 45s"
  },
  {
    id: "2", 
    type: "mortgage-calculator",
    timestamp: new Date("2025-10-15T14:25:00"),
    description: "Used Mortgage Calculator - $750,000 property value",
    duration: "5m 12s"
  },
  {
    id: "3",
    type: "borrowing-capacity",
    timestamp: new Date("2025-10-15T14:15:00"),
    description: "Assessed Borrowing Capacity - Income verification",
    duration: "7m 30s"
  }
];

const getEventIcon = (type: TimelineEvent["type"]) => {
  switch (type) {
    case "loan-calculator":
      return <IconCalculator size={20} />;
    case "mortgage-calculator":
      return <IconHome size={20} />;
    case "borrowing-capacity":
      return <IconCreditCard size={20} />;
    default:
      return <IconCalculator size={20} />;
  }
};

const getEventColor = (type: TimelineEvent["type"]) => {
  switch (type) {
    case "loan-calculator":
      return "blue";
    case "mortgage-calculator":
      return "green";
    case "borrowing-capacity":
      return "orange";
    default:
      return "gray";
  }
};

export function TimelineOfEngagement() {
  return (
    <Paper p="lg" shadow="sm" radius="md">
      <Title order={3} mb="md">Timeline of Engagement</Title>
      
      <Stack gap="md">
        {mockEvents.map((event, index) => (
          <Box key={event.id}>
            <Group gap="md" align="flex-start">
              <Avatar
                size="md"
                radius="xl"
                color={getEventColor(event.type)}
                variant="light"
              >
                {getEventIcon(event.type)}
              </Avatar>
              
              <Box flex={1}>
                <Group justify="space-between" mb="xs">
                  <Text size="sm" fw={500}>
                    {event.description}
                  </Text>
                  <Badge size="xs" variant="light" color={getEventColor(event.type)}>
                    {event.duration}
                  </Badge>
                </Group>
                
                <Text size="xs" c="dimmed">
                  {event.timestamp.toLocaleString("en-AU", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true
                  })}
                </Text>
              </Box>
            </Group>
            
            {index < mockEvents.length - 1 && (
              <Box ml={22} mt="xs" mb="xs">
                <Box 
                  w={2} 
                  h={20} 
                  bg="gray.3"
                  style={{ borderRadius: 1 }}
                />
              </Box>
            )}
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}