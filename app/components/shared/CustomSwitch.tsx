import { Box, Flex, Switch, Text } from "@chakra-ui/react";
import { useState, type ReactNode } from "react";

interface CustomSwitchProps {
  listTabs: {
    id: string;
    title: string;
    component: ReactNode;
  }[];
}

export const CustomSwitch = ({ listTabs }: CustomSwitchProps) => {
  const [checked, setChecked] = useState(false);
  const activeTab = checked ? listTabs[1] : listTabs[0];

  return (
    <Flex w={"100%"} flexDirection={"column"}>
      <Switch.Root
        size="lg"
        checked={checked}
        onCheckedChange={(e) => setChecked(e.checked)}
      >
        <Switch.HiddenInput />
        <Switch.Control
          h="42px"
          w={"280px"}
          alignItems="center"
          p="10px 16px"
          bgColor={"#F1F1F1"}
          justifyContent="space-between"
        >
          <Switch.Thumb
            w={"fit-content"}
            p="10px 16px"
            h="42px"
            backgroundColor={"#F6F6F6"}
            transform={checked ? "translateX(120px)" : "translateX(-15px)"}
          >
            <Text fontWeight="700" fontSize="14px" color="#B02736">
              {activeTab.title}
            </Text>
          </Switch.Thumb>
          <Switch.Indicator
            w="100%"
            fallback={
              <Text
                transform={checked ? "translateX(-30px)" : "translateX(25px)"}
                fontWeight="600"
                fontSize="13px"
                color="#707070"
              >
                {listTabs[1].title}
              </Text>
            }
            transform={checked ? "translateX(-75px)" : "translateX(25px)"}
          >
            <Text fontWeight="600" fontSize="13px" color="#707070">
              {listTabs[0].title}
            </Text>
          </Switch.Indicator>
        </Switch.Control>
      </Switch.Root>

      {/* Affiche le composant actif */}
      <Box style={{ marginTop: "20px" }}>
        {activeTab?.component && activeTab.component}
      </Box>
    </Flex>
  );
};
