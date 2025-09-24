// BackofficeTabs.tsx
import { Tabs } from "@chakra-ui/react";
import type { ReactNode } from "react";
import SidebarBg from "../../../assets/img/sidebar-bg.png";

interface BackofficeTabsProps {
  tabList: { id: string; component: ReactNode }[];
  activeTabId: string;
  onChange?: (tabSelected: string) => void;
  children: (tabSelected: string) => ReactNode;
}

const BackofficeTabs: React.FC<BackofficeTabsProps> = ({
  tabList,
  activeTabId,
  onChange,
  children,
}) => {
  const handleTabClick = (value: string) => {
    onChange?.(value);
  };

  return (
    <Tabs.Root
      value={activeTabId}
      onValueChange={({ value }) => handleTabClick(value)}
      variant={"outline"}
      display="flex"
      flexDirection="column"
      width="100%"
    >
      <Tabs.List display="flex" gap="16px">
        {tabList.map((tab) => (
          <Tabs.Trigger
            key={tab.id}
            value={tab.id}
            backgroundColor="white"
            borderTopRadius="5px"
            borderBottomRadius="0px"
            p="8px 24px"
            fontWeight={"600"}
            fontSize={"13px"}
            _selected={{
              color: "#B02736",
              backgroundColor: "#B027360A",
              borderTop: "1px solid #B027360A",
              borderX: "1px solid #B027360A",
              borderBottom: "3px solid #B02736 !important",
            }}
            _hover={{
              borderTop: "1px solid white",
              borderX: "1px solid white",
              borderBottom: "1px solid #A6A6A6",
            }}
            _focus={{
              borderTop: "1px solid #F1F1F1",
              borderX: "1px solid #F1F1F1",
              borderBottom: "1px solid #A6A6A6",
              boxShadow: "none",
              outline: "none",
            }}
          >
            {tab.id}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {tabList.map((tab) => (
        <Tabs.Content key={tab.id} value={tab.id} bgImage={`url(${SidebarBg})`}>
          {activeTabId === tab.id && children(tab.id)}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};

export default BackofficeTabs;
