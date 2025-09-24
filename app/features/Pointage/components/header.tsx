import { Flex, Image, Menu, Portal, Text, VStack } from "@chakra-ui/react";
import type { Collaborator } from "../../../types";
import { UserIcon } from "../../../components/icons";
import oneworldLogo from "../../../assets/img/oneworld_logo.png";
import ramLogo from "../../../assets/img/RAM_logo.png";
import SidebarBg from "../../../assets/img/sidebar-bg.png";
import { LuLogOut } from "react-icons/lu";
import { useBackOfficeLogout } from "../hooks/useLogout";
import { useAuthStore } from "../../Login/store/authStore";

interface HeaderProps {
  collaborator: Collaborator;
}

function Header({ collaborator }: HeaderProps) {
  const handleBackOfficeLogout = useBackOfficeLogout();
  const { profile } = useAuthStore();
  return (
    <Flex
      bgImage={`url(${SidebarBg})`}
      bgSize="cover"
      boxShadow={"4px 0px 12px 0px #EAEAEA"}
      border={"1px solid #B4936033"}
      bgColor={"#F9F7F5"}
      borderRadius={"8px"}
      py={2}
      px={12}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <VStack gap={6} align="center">
        <Flex align={"center"} gap={2}>
          <Image src={ramLogo} h={16} w={"auto"} cursor="pointer" />
          <Image src={oneworldLogo} h={12} w={"auto"} />
        </Flex>
      </VStack>
      <Menu.Root closeOnSelect unstyled>
        <Menu.Trigger asChild>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={"5px"}
            cursor={"pointer"}
          >
            <UserIcon size="lg" color={"#3333333"} />
            <Text color={"#3333333"} fontSize={"14px"} fontWeight={"700"}>
              {collaborator?.firstname + " " + collaborator?.lastname}
            </Text>
          </Flex>
        </Menu.Trigger>
        {profile === "ADMIN" && (
          <Portal>
            <Menu.Positioner
              w={"133px"}
              boxShadow={"1px 1px 4px 0px #00000040"}
              backgroundColor={"white"}
              p={"8px 32px"}
              borderRadius={"4px"}
              _hover={{ color: "RAM.red" }}
              mt={"10px"}
            >
              <Menu.Content>
                <Menu.Item
                  value="logout"
                  cursor={"pointer"}
                  onClick={handleBackOfficeLogout}
                >
                  <Flex
                    fontWeight={"600"}
                    fontSize={"13px"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    gap={"10px"}
                  >
                    <LuLogOut color={"currentColor"} size={"20px"} />
                    Logout
                  </Flex>
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        )}
      </Menu.Root>
    </Flex>
  );
}

export default Header;
