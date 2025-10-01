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
  Avatar,
  Progress,
  Rating,
  Divider,
  List,
} from "@mantine/core";
import {
  IconUser,
  IconBuildingStore,
  IconPhone,
  IconMail,
  IconMapPin,
  IconStar,
  IconCalendar,
  IconCurrencyDollar,
  IconHome,
  IconTrendingUp,
  IconAward,
  IconUsers,
} from "@tabler/icons-react";

interface BuyerAgentData {
  agent: {
    name: string;
    title: string;
    photo?: string;
    phone: string;
    mobile: string;
    email: string;
    licenseNumber: string;
    yearsExperience: number;
  };
  agency: {
    name: string;
    address: string;
    phone: string;
    website: string;
    established: number;
    logo?: string;
  };
  performance: {
    rating: number;
    totalSales: number;
    averageDays: number;
    averagePrice: number;
    lastYearSales: number;
    settlementRate: number; // percentage
  };
  specializations: string[];
  recentSales: {
    address: string;
    suburb: string;
    price: number;
    settlementDate: Date;
    daysOnMarket: number;
    propertyType: string;
  }[];
  awards: {
    year: number;
    title: string;
    organization: string;
  }[];
  clientTestimonials: {
    name: string;
    suburb: string;
    date: Date;
    rating: number;
    comment: string;
  }[];
}

const mockAgentData: BuyerAgentData = {
  agent: {
    name: "Jessica Anderson",
    title: "Senior Sales Representative & Buyer's Agent",
    photo: "/agent.jpeg", // Would be actual photo URL in real app
    phone: "(02) 9555-1234",
    mobile: "0412 345 678",
    email: "jessica.anderson@premierrealty.com.au",
    licenseNumber: "20012345",
    yearsExperience: 8,
  },
  agency: {
    name: "Premier Realty Sydney",
    address: "123 King Street, Sydney NSW 2000",
    phone: "(02) 9555-1200",
    website: "www.premierrealty.com.au",
    established: 1995,
  },
  performance: {
    rating: 4.8,
    totalSales: 247,
    averageDays: 28,
    averagePrice: 1250000,
    lastYearSales: 42,
    settlementRate: 96.8,
  },
  specializations: [
    "Inner West Properties",
    "First Home Buyers",
    "Investment Properties",
    "Apartment Purchases",
    "Auction Bidding",
  ],
  recentSales: [
    {
      address: "12/87 Enmore Road",
      suburb: "Newtown",
      price: 1180000,
      settlementDate: new Date("2025-09-15"),
      daysOnMarket: 21,
      propertyType: "Apartment",
    },
    {
      address: "156 Livingstone Road",
      suburb: "Marrickville",
      price: 1450000,
      settlementDate: new Date("2025-09-28"),
      daysOnMarket: 35,
      propertyType: "House",
    },
    {
      address: "9/234 Darling Street",
      suburb: "Balmain",
      price: 1680000,
      settlementDate: new Date("2025-10-12"),
      daysOnMarket: 19,
      propertyType: "Apartment",
    },
    {
      address: "78 Wilson Street",
      suburb: "Newtown",
      price: 1095000,
      settlementDate: new Date("2025-09-30"),
      daysOnMarket: 42,
      propertyType: "Terrace",
    },
  ],
  awards: [
    {
      year: 2024,
      title: "Top 10 Buyer's Agent - Inner West",
      organization: "Real Estate Institute NSW",
    },
    {
      year: 2023,
      title: "Excellence in Customer Service",
      organization: "Premier Realty Network",
    },
    {
      year: 2022,
      title: "Rising Star Award",
      organization: "Australian Buyer's Agent Institute",
    },
  ],
  clientTestimonials: [
    {
      name: "Sarah & Michael Chen",
      suburb: "Newtown",
      date: new Date("2025-09-20"),
      rating: 5,
      comment:
        "Jessica made our first home buying experience seamless. Her knowledge of the Inner West market is exceptional and she negotiated a great price for us.",
    },
    {
      name: "David Thompson",
      suburb: "Marrickville",
      date: new Date("2025-10-15"),
      rating: 5,
      comment:
        "Professional, responsive and really understands what buyers are looking for. Highly recommended for investment properties.",
    },
    {
      name: "Emma Rodriguez",
      suburb: "Balmain",
      date: new Date("2025-09-08"),
      rating: 4,
      comment:
        "Great communication throughout the process. Jessica found us the perfect apartment within our budget and timeline.",
    },
  ],
};

const formatCurrency = (amount: number) => `$${amount.toLocaleString()}`;

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getPerformanceColor = (
  value: number,
  threshold: { good: number; excellent: number }
) => {
  if (value >= threshold.excellent) return "green";
  if (value >= threshold.good) return "orange";
  return "red";
};

export function BuyerAgentInfo() {
  const data = mockAgentData;

  const averageRating =
    data.clientTestimonials.reduce((sum, t) => sum + t.rating, 0) /
    data.clientTestimonials.length;

  return (
    <Paper p="lg" shadow="sm" radius="md">
      <Title order={3} mb="md">
        Buyer's Agent Information
      </Title>

      <Stack gap="lg">
        {/* Agent Profile */}
        <Card p="md" withBorder>
          <Group gap="md" mb="md">
            <Avatar src={data.agent.photo} size={80} radius="md" color="blue">
              <IconUser size={40} />
            </Avatar>

            <Box flex={1}>
              <Text size="lg" fw={700}>
                {data.agent.name}
              </Text>
              <Text size="sm" c="dimmed" mb="xs">
                {data.agent.title}
              </Text>
              <Group gap="md">
                <Group gap="xs">
                  <IconStar size={16} />
                  <Text size="sm" fw={500}>
                    {data.performance.rating}
                  </Text>
                  <Rating
                    value={data.performance.rating}
                    fractions={2}
                    readOnly
                    size="sm"
                  />
                </Group>
                <Badge variant="light" color="blue">
                  {data.agent.yearsExperience} Years Experience
                </Badge>
              </Group>
            </Box>
          </Group>

          <SimpleGrid cols={2} spacing="md">
            <Stack gap="xs">
              <Group gap="xs">
                <IconPhone size={16} />
                <Text size="sm">{data.agent.phone}</Text>
              </Group>
              <Group gap="xs">
                <IconPhone size={16} />
                <Text size="sm">{data.agent.mobile} (Mobile)</Text>
              </Group>
              <Group gap="xs">
                <IconMail size={16} />
                <Text size="sm">{data.agent.email}</Text>
              </Group>
            </Stack>

            <Stack gap="xs">
              <Text size="sm">
                <strong>License:</strong> {data.agent.licenseNumber}
              </Text>
              <Text size="sm">
                <strong>Agency:</strong> {data.agency.name}
              </Text>
              <Text size="sm">
                <strong>Est:</strong> {data.agency.established}
              </Text>
            </Stack>
          </SimpleGrid>
        </Card>

        {/* Performance Metrics */}
        <Card p="md" withBorder>
          <Title order={4} mb="md">
            Performance Metrics
          </Title>

          <SimpleGrid cols={4} spacing="md">
            <Box ta="center">
              <Text size="xl" fw={700} c="blue">
                {data.performance.totalSales}
              </Text>
              <Text size="sm" c="dimmed">
                Total Sales
              </Text>
            </Box>

            <Box ta="center">
              <Text
                size="xl"
                fw={700}
                c={getPerformanceColor(data.performance.settlementRate, {
                  good: 90,
                  excellent: 95,
                })}
              >
                {data.performance.settlementRate}%
              </Text>
              <Text size="sm" c="dimmed">
                Settlement Rate
              </Text>
            </Box>

            <Box ta="center">
              <Text
                size="xl"
                fw={700}
                c={getPerformanceColor(45 - data.performance.averageDays, {
                  good: 15,
                  excellent: 25,
                })}
              >
                {data.performance.averageDays}
              </Text>
              <Text size="sm" c="dimmed">
                Avg Days on Market
              </Text>
            </Box>

            <Box ta="center">
              <Text size="xl" fw={700}>
                {formatCurrency(data.performance.averagePrice)}
              </Text>
              <Text size="sm" c="dimmed">
                Avg Sale Price
              </Text>
            </Box>
          </SimpleGrid>

          <Divider my="md" />

          <Group justify="space-between">
            <Text fw={500}>Last 12 Months Performance</Text>
            <Badge size="lg" color="green" variant="light">
              {data.performance.lastYearSales} Sales
            </Badge>
          </Group>
        </Card>

        {/* Specializations */}
        <Card p="md" withBorder>
          <Group gap="xs" mb="md">
            <IconAward size={20} />
            <Title order={4}>Specializations</Title>
          </Group>

          <Group gap="xs">
            {data.specializations.map((spec, idx) => (
              <Badge key={idx} variant="light" color="blue">
                {spec}
              </Badge>
            ))}
          </Group>
        </Card>

        {/* Recent Sales */}
        <Card p="md" withBorder>
          <Group gap="xs" mb="md">
            <IconHome size={20} />
            <Title order={4}>Recent Sales</Title>
          </Group>

          <Stack gap="sm">
            {data.recentSales.map((sale, idx) => (
              <Card key={idx} p="sm" withBorder>
                <Group justify="space-between" mb="xs">
                  <Box>
                    <Text fw={500}>{sale.address}</Text>
                    <Text size="sm" c="dimmed">
                      {sale.suburb}
                    </Text>
                  </Box>
                  <Box ta="right">
                    <Text fw={700} c="green">
                      {formatCurrency(sale.price)}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {sale.propertyType}
                    </Text>
                  </Box>
                </Group>

                <Group gap="md">
                  <Text size="xs">
                    <IconCalendar size={12} style={{ marginRight: 4 }} />
                    Settled: {formatDate(sale.settlementDate)}
                  </Text>
                  <Text size="xs">
                    <IconTrendingUp size={12} style={{ marginRight: 4 }} />
                    {sale.daysOnMarket} days
                  </Text>
                </Group>
              </Card>
            ))}
          </Stack>
        </Card>

        {/* Awards & Recognition */}
        <Card p="md" withBorder>
          <Group gap="xs" mb="md">
            <IconAward size={20} />
            <Title order={4}>Awards & Recognition</Title>
          </Group>

          <Stack gap="sm">
            {data.awards.map((award, idx) => (
              <Group
                key={idx}
                justify="space-between"
                p="sm"
                style={{
                  border: "1px solid var(--mantine-color-gray-3)",
                  borderRadius: "var(--mantine-radius-sm)",
                }}
              >
                <Box>
                  <Text fw={500}>{award.title}</Text>
                  <Text size="sm" c="dimmed">
                    {award.organization}
                  </Text>
                </Box>
                <Badge variant="outline">{award.year}</Badge>
              </Group>
            ))}
          </Stack>
        </Card>

        {/* Client Testimonials */}
        <Card p="md" withBorder>
          <Group justify="space-between" mb="md">
            <Group gap="xs">
              <IconUsers size={20} />
              <Title order={4}>Client Testimonials</Title>
            </Group>
            <Group gap="xs">
              <IconStar size={16} />
              <Text size="sm" fw={500}>
                {averageRating.toFixed(1)} Average
              </Text>
            </Group>
          </Group>

          <Stack gap="md">
            {data.clientTestimonials.map((testimonial, idx) => (
              <Card key={idx} p="sm" withBorder>
                <Group justify="space-between" mb="xs">
                  <Box>
                    <Text fw={500}>{testimonial.name}</Text>
                    <Text size="xs" c="dimmed">
                      {testimonial.suburb} • {formatDate(testimonial.date)}
                    </Text>
                  </Box>
                  <Rating value={testimonial.rating} readOnly size="sm" />
                </Group>
                <Text size="sm" fs="italic">
                  "{testimonial.comment}"
                </Text>
              </Card>
            ))}
          </Stack>
        </Card>

        {/* Agency Information */}
        <Card p="md" withBorder>
          <Group gap="xs" mb="md">
            <IconBuildingStore size={20} />
            <Title order={4}>Agency Details</Title>
          </Group>

          <SimpleGrid cols={2} spacing="md">
            <Stack gap="sm">
              <Box>
                <Text size="sm" c="dimmed">
                  Agency Name
                </Text>
                <Text fw={500}>{data.agency.name}</Text>
              </Box>
              <Box>
                <Text size="sm" c="dimmed">
                  Phone
                </Text>
                <Text fw={500}>{data.agency.phone}</Text>
              </Box>
              <Box>
                <Text size="sm" c="dimmed">
                  Website
                </Text>
                <Text fw={500}>{data.agency.website}</Text>
              </Box>
            </Stack>

            <Stack gap="sm">
              <Box>
                <Text size="sm" c="dimmed">
                  Address
                </Text>
                <Text fw={500}>{data.agency.address}</Text>
              </Box>
              <Box>
                <Text size="sm" c="dimmed">
                  Established
                </Text>
                <Text fw={500}>
                  {data.agency.established} (
                  {new Date().getFullYear() - data.agency.established} years)
                </Text>
              </Box>
            </Stack>
          </SimpleGrid>
        </Card>

        {/* Key Benefits */}
        <Card p="md" withBorder bg="green.0">
          <Title order={4} mb="md">
            Why Choose This Agent?
          </Title>
          <List spacing="xs" size="sm">
            <List.Item>
              Specialist knowledge of Inner West Sydney market
            </List.Item>
            <List.Item>
              Proven track record with {data.performance.settlementRate}%
              settlement success rate
            </List.Item>
            <List.Item>
              Average {data.performance.averageDays} days to settlement (below
              market average)
            </List.Item>
            <List.Item>
              Experienced in negotiating with {data.performance.totalSales}+
              successful transactions
            </List.Item>
            <List.Item>
              Recent awards and recognition from industry peers
            </List.Item>
            <List.Item>
              Strong client satisfaction with {averageRating.toFixed(1)}/5 star
              rating
            </List.Item>
          </List>
        </Card>
      </Stack>
    </Paper>
  );
}
