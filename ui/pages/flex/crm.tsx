import {
  Stack,
  AppShell,
  NavLink,
  ScrollArea,
  Box,
  Text,
} from "@mantine/core";
import {
  IconTimeline,
  IconMapPin,
  IconCalculator,
  IconChartLine,
  IconAlertTriangle,
  IconClipboardCheck,
  IconBuilding,
  IconKey,
  IconUser,
} from "@tabler/icons-react";
import { useState } from "react";
import { TimelineOfEngagement } from "@/components/CRM/TimelineOfEngagement";
import { SuburbResearch } from "@/components/CRM/SuburbResearch";
import { BorrowingCapacity } from "@/components/CRM/BorrowingCapacity";
import { ScenarioPlanning } from "@/components/CRM/ScenarioPlanning";
import { BorrowerRisks } from "@/components/CRM/BorrowerRisks";
import { NextActions } from "@/components/CRM/NextActions";
import { Conveyancing } from "@/components/CRM/Conveyancing";
import { SettlementInfo } from "@/components/CRM/SettlementInfo";
import { BuyerAgentInfo } from "@/components/CRM/BuyerAgentInfo";
import Image from "next/image";

const navigationItems = [
  { id: "next-actions", label: "Next Actions", icon: IconClipboardCheck },
  { id: "timeline", label: "Timeline", icon: IconTimeline },
  {
    id: "borrowing-capacity",
    label: "Borrowing Capacity",
    icon: IconCalculator,
  },
  { id: "borrower-risks", label: "Borrower Risks", icon: IconAlertTriangle },
  { id: "suburb-research", label: "Suburb Research", icon: IconMapPin },
  { id: "scenario-planning", label: "Scenario Planning", icon: IconChartLine },
  { id: "conveyancing", label: "Conveyancing", icon: IconBuilding },
  { id: "settlement-info", label: "Settlement Info", icon: IconKey },
  { id: "buyer-agent-info", label: "Buyer's Agent", icon: IconUser },
];

export default function CRMPage() {
  const [activeSection, setActiveSection] = useState("next-actions");

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AppShell
      navbar={{
        width: 280,
        breakpoint: "md",
      }}
      padding={0}
    >
      <AppShell.Navbar>
        <ScrollArea h="100%">
          <Box p="md">
            <Stack align="center" gap="xs" mb="xs">
              <Image
                alt="owl"
                src={"/owl-homes-icon.svg"}
                width="100"
                height="100"
              />
              <Text size="lg" fw={700} ta="center">
                Owl Homes CRM
              </Text>
            </Stack>
            <Stack gap="xs">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.id}
                  label={item.label}
                  leftSection={<item.icon size={20} />}
                  active={activeSection === item.id}
                  onClick={() => scrollToSection(item.id)}
                  variant="subtle"
                />
              ))}
            </Stack>
          </Box>
        </ScrollArea>
      </AppShell.Navbar>

      <AppShell.Main>
        <Stack gap="xl" style={{ width: '100%', padding: 0 }}>
            {/* Next Actions */}
            <div id="next-actions">
              <NextActions />
            </div>

            {/* Timeline of Engagement */}
            <div id="timeline">
              <TimelineOfEngagement />
            </div>

            {/* Borrowing Capacity */}
            <div id="borrowing-capacity">
              <BorrowingCapacity />
            </div>

            {/* Borrower Risks */}
            <div id="borrower-risks">
              <BorrowerRisks />
            </div>

            {/* Suburb Research */}
            <div id="suburb-research">
              <SuburbResearch />
            </div>

            {/* Scenario Planning */}
            <div id="scenario-planning">
              <ScenarioPlanning />
            </div>

            {/* Conveyancing */}
            <div id="conveyancing">
              <Conveyancing />
            </div>

            {/* Settlement Information */}
            <div id="settlement-info">
              <SettlementInfo />
            </div>

            {/* Buyer's Agent Information */}
            <div id="buyer-agent-info">
              <BuyerAgentInfo />
            </div>
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
}
