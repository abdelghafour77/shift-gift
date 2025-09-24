import { Menu, Input, Box, Button, Text, Flex } from "@chakra-ui/react";
import { useState, useMemo } from "react";
import CustomLoadingSpinner from "./CustomLoadingSpinner";
import { DropdownIcon } from "../icons/DropdownIcon";

interface CustomSelectProps {
  label: string;
  placeholder: string;
  data: { value: string; label: string }[];
  selectedValue: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  onChange(v: string): void;
  withSearch?: boolean;
}

export const CustomSelect = ({
  label,
  placeholder,
  data,
  selectedValue,
  isLoading = false,
  isDisabled,
  onChange,
  withSearch,
}: CustomSelectProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filtered = useMemo(
    () =>
      (data ?? []).filter((item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, data]
  );

  return (
    <Flex direction="column" width="100%">
      <Text
        mb={1}
        fontWeight={"600"}
        fontSize={"14px"}
        color={"#454545"}
        textAlign={"start"}
      >
        {label}
      </Text>

      <Menu.Root
        open={isOpen}
        onOpenChange={(details) => setIsOpen(details.open)}
      >
        <Menu.Trigger
          asChild
          width="100%"
          color="#333333"
          bg={"#FBFBFB !important"}
          borderRadius={"5px"}
          border={"1px solid #DDDDDD"}
          _focus={{
            border: "1px solid #DDDDDD",
          }}
          _active={{
            border: "1px solid #DDDDDD",
          }}
          _hover={{
            border: "1px solid #DDDDDD",
          }}
        >
          <Button
            display={"flex"}
            justifyContent={"space-between"}
            value={selectedValue ? [selectedValue] : []}
            disabled={isDisabled}
          >
            {selectedValue ? (
              <Text
                ml={"0"}
                color={"#454545"}
                textTransform={"none"}
                fontWeight={"600"}
                fontSize={"13px"}
              >
                {data?.find((item) => item.value === selectedValue)?.label}
              </Text>
            ) : (
              <Text
                ml={"0"}
                color={"#ABABAB"}
                textTransform={"none"}
                fontWeight={"500"}
                fontSize={"14px"}
              >
                {placeholder}
              </Text>
            )}

            <DropdownIcon color="#333333" boxSize="12px" />
          </Button>
        </Menu.Trigger>

        <Menu.Positioner width={"fit-content"}>
          <Menu.Content
            width={"fit-content"}
            bg={"#FBFBFB !important"}
            borderRadius={"0 0 5px 5px"}
            border={"1px solid #DDDDDD"}
            mt={1}
          >
            {withSearch !== false && (
              <Box
                px={3}
                py={2}
                position="sticky"
                top={0}
                bg="#FBFBFB"
                zIndex={1}
              >
                <Input
                  placeholder={`Rechercher ${label.toLowerCase()}...`}
                  size="sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
              </Box>
            )}

            {isLoading ? (
              <CustomLoadingSpinner />
            ) : filtered.length === 0 ? (
              <Box p={3} fontSize="sm" color="gray.500">
                Aucun résultat
              </Box>
            ) : (
              filtered.map((item) => (
                <Box
                  key={item.value}
                  cursor="pointer"
                  textAlign={"start"}
                  p={"6px 10px"}
                  onClick={() => {
                    onChange(item.value);
                    setSearchTerm("");
                    setIsOpen(false);
                  }}
                >
                  {item.label}
                </Box>
              ))
            )}
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    </Flex>
  );
};
