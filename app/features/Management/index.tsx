import { Flex } from "@chakra-ui/react";
import Header from "../Pointage/components/header";
import { useGlobalStore } from "../../store/globalStore";
import CustomLoadingSpinner from "../../components/shared/CustomLoadingSpinner";
import BackofficeTabs from "./components/BackofficeTabs";
import { useState } from "react";
import { MachinePage } from "./components/Machine";
import { CollaboratorPage } from "./components/User";
import { ShiftPage } from "./components/Shift";

export default function ManagementPage() {
  const { collaborator } = useGlobalStore();

  const tabList = [
    {
      id: "Historique des pointages",
      component: <ShiftPage />,
    },
    {
      id: "Utilisateurs",
      component: <CollaboratorPage />,
    },
    {
      id: "Machines",
      component: <MachinePage />,
    },
  ];

  const [activeSegmentId, setActiveSegmentId] = useState<string>(tabList[0].id);

  if (!collaborator) {
    return <CustomLoadingSpinner />;
  }

  return (
    <Flex
      flexDirection={"column"}
      h={"100%"}
      w={"100%"}
      gap={"50px"}
      p={"2rem"}
    >
      <Header collaborator={collaborator} />

      <BackofficeTabs
        tabList={tabList}
        activeTabId={activeSegmentId}
        onChange={(seg: string) => setActiveSegmentId(seg)}
      >
        {(tabId: string) => {
          const currentTab = tabList.find((tab) => tab.id === tabId);
          return (
            <Flex key={activeSegmentId}>{currentTab?.component ?? null}</Flex>
          );
        }}
      </BackofficeTabs>
    </Flex>
  );
}
