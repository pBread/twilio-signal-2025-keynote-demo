import {
  Paper,
  Stack,
  Text,
  Title,
  Group,
  Badge,
  Card,
  Slider,
  Grid,
  Box,
  Divider,
  SimpleGrid,
} from "@mantine/core";
import {
  IconMapPin,
  IconSchool,
  IconDog,
  IconCoffee,
  IconUsers,
} from "@tabler/icons-react";
import { useState } from "react";

interface SuburbData {
  name: string;
  state: string;
  medianPrice: number;
  priceRange: [number, number];
  demographics: {
    medianAge: number;
    familyPercentage: number;
  };
  schools: Array<{
    name: string;
    type: "Public" | "Private";
    fees?: number;
  }>;
  amenities: {
    dogParks: string[];
    cafes: string[];
  };
}

interface PropertyExample {
  suburb: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  propertyType: string;
  description: string;
}

const suburbData: SuburbData[] = [
  {
    name: "Newtown",
    state: "NSW",
    medianPrice: 1200000,
    priceRange: [800000, 1600000],
    demographics: {
      medianAge: 32,
      familyPercentage: 35,
    },
    schools: [
      { name: "Newtown High School", type: "Public" },
      { name: "St Francis Xavier Primary", type: "Private", fees: 8500 },
    ],
    amenities: {
      dogParks: ["Sydney Park", "Camperdown Memorial Rest Park"],
      cafes: ["Black Star Pastry", "Gigi Pizzeria", "The Grounds"],
    },
  },
  {
    name: "Marrickville",
    state: "NSW",
    medianPrice: 1100000,
    priceRange: [750000, 1500000],
    demographics: {
      medianAge: 34,
      familyPercentage: 42,
    },
    schools: [
      { name: "Marrickville High School", type: "Public" },
      { name: "St Brigid's Catholic School", type: "Private", fees: 7200 },
    ],
    amenities: {
      dogParks: ["Marrickville Park", "Steel Park"],
      cafes: ["Campos Coffee", "Yellow", "Black Bear BBQ"],
    },
  },
  {
    name: "Balmain",
    state: "NSW",
    medianPrice: 1800000,
    priceRange: [1200000, 2500000],
    demographics: {
      medianAge: 38,
      familyPercentage: 48,
    },
    schools: [
      { name: "Balmain Public School", type: "Public" },
      { name: "St Joseph's College", type: "Private", fees: 15000 },
    ],
    amenities: {
      dogParks: ["Elkington Park", "Birchgrove Park"],
      cafes: ["Acai Brothers", "Kaffe Culture", "The Cottage"],
    },
  },
];

const propertyExamples: PropertyExample[] = [
  {
    suburb: "Newtown",
    price: 1150000,
    bedrooms: 3,
    bathrooms: 2,
    propertyType: "Terrace",
    description: "Victorian terrace with period features",
  },
  {
    suburb: "Marrickville",
    price: 980000,
    bedrooms: 2,
    bathrooms: 1,
    propertyType: "Apartment",
    description: "Modern apartment near transport",
  },
  {
    suburb: "Balmain",
    price: 1650000,
    bedrooms: 4,
    bathrooms: 3,
    propertyType: "House",
    description: "Renovated family home with harbour glimpses",
  },
];

const maxBorrowingCapacity = 950000;

export function SuburbResearch() {
  const [borrowingCapacity, setBorrowingCapacity] = useState(maxBorrowingCapacity);

  return (
    <Paper p="lg" shadow="sm" radius="md">
      <Title order={3} mb="md">
        Suburb Research
      </Title>

      <Stack gap="lg">
        {/* Borrowing Capacity Indicator */}
        <Card p="md" withBorder>
          <Group justify="space-between" mb="sm">
            <Text fw={500}>Maximum Borrowing Capacity</Text>
            <Badge color="orange" variant="light">
              ${borrowingCapacity.toLocaleString()}
            </Badge>
          </Group>
          <Text size="sm" c="dimmed" mb="md">
            Based on current income and expenses assessment
          </Text>
        </Card>

        {/* Suburb Details */}
        {suburbData.map((suburb) => (
          <Card key={suburb.name} p="md" withBorder>
            <Group justify="space-between" mb="md">
              <Group gap="xs">
                <IconMapPin size={20} />
                <Title order={4}>
                  {suburb.name}, {suburb.state}
                </Title>
              </Group>
              <Badge
                color={
                  suburb.medianPrice > borrowingCapacity ? "red" : "green"
                }
                variant="light"
              >
                Median: ${suburb.medianPrice.toLocaleString()}
              </Badge>
            </Group>

            {/* Price Range Slider */}
            <Box mb="md">
              <Group justify="space-between" mb="xs">
                <Text size="sm" fw={500}>
                  Price Range
                </Text>
                <Text size="xs" c="dimmed">
                  {((borrowingCapacity / suburb.medianPrice) * 100).toFixed(
                    0
                  )}
                  % of borrowing capacity
                </Text>
              </Group>
              <Slider
                min={suburb.priceRange[0]}
                max={suburb.priceRange[1]}
                value={borrowingCapacity}
                onChange={setBorrowingCapacity}
                marks={[
                  {
                    value: suburb.priceRange[0],
                    label: `$${suburb.priceRange[0] / 1000}k`,
                  },
                  {
                    value: suburb.medianPrice,
                    label: `$${suburb.medianPrice / 1000}k`,
                  },
                  {
                    value: suburb.priceRange[1],
                    label: `$${suburb.priceRange[1] / 1000}k`,
                  },
                ]}
                color={
                  borrowingCapacity < suburb.medianPrice ? "red" : "green"
                }
              />
            </Box>

            <SimpleGrid cols={2} spacing="md">
              {/* Demographics */}
              <Box>
                <Group gap="xs" mb="xs">
                  <IconUsers size={16} />
                  <Text size="sm" fw={500}>
                    Demographics
                  </Text>
                </Group>
                <Stack gap={4}>
                  <Text size="xs">
                    Median Age: {suburb.demographics.medianAge} years
                  </Text>
                  <Text size="xs">
                    Families: {suburb.demographics.familyPercentage}%
                  </Text>
                </Stack>
              </Box>

              {/* Schools */}
              <Box>
                <Group gap="xs" mb="xs">
                  <IconSchool size={16} />
                  <Text size="sm" fw={500}>
                    Schools
                  </Text>
                </Group>
                <Stack gap={4}>
                  {suburb.schools.map((school, idx) => (
                    <Group key={idx} justify="space-between" gap="xs">
                      <Text size="xs" truncate>
                        {school.name}
                      </Text>
                      <Badge
                        size="xs"
                        variant="light"
                        color={school.type === "Private" ? "blue" : "gray"}
                      >
                        {school.type === "Private"
                          ? `$${school.fees}`
                          : "Public"}
                      </Badge>
                    </Group>
                  ))}
                </Stack>
              </Box>
            </SimpleGrid>

            <Divider my="md" />

            {/* Amenities */}
            <SimpleGrid cols={2} spacing="md">
              <Box>
                <Group gap="xs" mb="xs">
                  <IconDog size={16} />
                  <Text size="sm" fw={500}>
                    Dog Parks
                  </Text>
                </Group>
                <Text size="xs" c="dimmed">
                  {suburb.amenities.dogParks.join(", ")}
                </Text>
              </Box>

              <Box>
                <Group gap="xs" mb="xs">
                  <IconCoffee size={16} />
                  <Text size="sm" fw={500}>
                    Cafes & Dining
                  </Text>
                </Group>
                <Text size="xs" c="dimmed">
                  {suburb.amenities.cafes.join(", ")}
                </Text>
              </Box>
            </SimpleGrid>
          </Card>
        ))}

        {/* Property Examples */}
        <Box>
          <Title order={4} mb="md">
            Example Properties
          </Title>
          <SimpleGrid cols={3} spacing="md">
            {propertyExamples.map((property, idx) => (
              <Card key={idx} p="md" withBorder>
                <Group justify="space-between" mb="xs">
                  <Text fw={500}>{property.suburb}</Text>
                  <Badge
                    color={
                      property.price > borrowingCapacity ? "red" : "green"
                    }
                    variant="light"
                  >
                    ${property.price.toLocaleString()}
                  </Badge>
                </Group>
                <Text size="sm" c="dimmed" mb="xs">
                  {property.description}
                </Text>
                <Text size="xs">
                  {property.bedrooms} bed • {property.bathrooms} bath •{" "}
                  {property.propertyType}
                </Text>
              </Card>
            ))}
          </SimpleGrid>
        </Box>
      </Stack>
    </Paper>
  );
}
