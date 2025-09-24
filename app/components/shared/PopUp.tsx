import { Dialog, Flex, Image, Portal, Text, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import type { InputDefinition } from "../../types/baseInput.type";
import { CustomSelect } from "./CustomSelect";
import { CustomInput } from "./CustomInput";
import CustomButton from "./CustomButton";
import { addIcon, cancelIcon } from "../icons";

interface PopUpProps {
  title: string;
  message: string;
  btnMessage: string;
  isOpen: boolean;
  listInput: InputDefinition[];
  initialValues?: Record<string, any>;
  horizontalLayout?: boolean;
  isSettingPopup?: boolean;
  onClose: () => void;
  onSubmit: (formValues: Record<string, any>) => void;
  onProfileChange?: (profile: string) => void;
}

const PopUp = ({
  title,
  message,
  btnMessage,
  isOpen,
  listInput,
  initialValues,
  horizontalLayout = false,
  isSettingPopup = false,
  onClose,
  onSubmit,
  onProfileChange,
}: PopUpProps) => {
  const [formValues, setFormValues] = useState<Record<string, any>>(
    initialValues ?? {}
  );

  const renderInput = (input: InputDefinition) => {
    const handleChange = (value: any) => {
      setFormValues((prev) => ({ ...prev, [input.id]: value }));
    };

    const inputWidth = isSettingPopup ? "276px" : "100%";

    switch (input.type) {
      case "select":
        return (
          <Flex mb={2} w={inputWidth} gridColumn={input?.span}>
            <CustomSelect
              key={input.id}
              label={input.label}
              placeholder={input.placeholder}
              data={input.options}
              selectedValue={formValues[input.id] ?? ""}
              withSearch={true}
              isDisabled={input.isDisabled}
              onChange={(value) => {
                handleChange(value);
                if (input.onChange) input.onChange(value);
              }}
            />
          </Flex>
        );

      case "text":
        return (
          <Flex mb={2} w={"100%"} gridColumn={input?.span}>
            <CustomInput
              key={input.id}
              label={input.label}
              placeholder={input.placeholder}
              isDisabled={input.isDisabled}
              value={formValues[input.id] ?? ""}
              type={input.typeInput}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  [input.id]: e.target.value,
                }))
              }
            />
          </Flex>
        );

      case "radio":
        return (
          <Flex mb={4} w={inputWidth} flexDirection="column" gap="2">
            <Text fontWeight="500" fontSize="14px" color="gray.700">
              {input.label}
            </Text>
            <Flex gap="4">
              {input.options.map((option) => (
                <Box
                  as="label"
                  key={option.value}
                  display="flex"
                  alignItems="center"
                  gap="2"
                  position="relative"
                >
                  <input
                    type="radio"
                    name={input.id}
                    value={option.value}
                    checked={
                      String(formValues[input.id]) === String(option.value)
                    }
                    onChange={() => {
                      handleChange(option.value);
                      if (input.id === "profile") {
                        onProfileChange?.(option.value);
                      }
                    }}
                    style={{
                      appearance: "none",
                      width: "16px",
                      height: "16px",
                      border: "2px solid #674459",
                      borderRadius: "50%",
                      position: "relative",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  />
                  {String(formValues[input.id]) === String(option.value) && (
                    <Box
                      position="absolute"
                      width="8px"
                      height="9px"
                      borderRadius="50%"
                      backgroundColor="rgba(103, 68, 89, 1)"
                      top="5px"
                      left="4px"
                      pointerEvents="none"
                    />
                  )}
                  <Text fontSize="14px">{option.label}</Text>
                </Box>
              ))}
            </Flex>
          </Flex>
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    setFormValues(initialValues ?? {});
  }, [initialValues]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner alignItems={"center"}>
          <Dialog.Content
            w={isSettingPopup ? "fit-content" : "630px"}
            maxW="90vw"
          >
            <Dialog.Header
              pt={"30px"}
              px={"30px"}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-between"}
              textAlign={"start"}
              w={"100%"}
            >
              <Dialog.Title
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
              >
                <Text
                  color={"RAM.red"}
                  textTransform={"uppercase"}
                  fontWeight={"700"}
                  fontSize={"21px"}
                >
                  {title}
                </Text>
                <Image
                  src={cancelIcon}
                  boxSize={6}
                  onClick={onClose}
                  cursor={"pointer"}
                />
              </Dialog.Title>
              <Text
                color={"#454545"}
                fontWeight={"400"}
                fontSize={"14px"}
                textTransform={"none"}
              >
                {message}
              </Text>
            </Dialog.Header>
            <Dialog.Body
              width={"100%"}
              px={"30px"}
              display={
                horizontalLayout && listInput.length >= 3 ? "block" : "grid"
              }
              gapX={"32px"}
              gapY={"24px"}
              gridTemplateColumns="repeat(2, 1fr)"
            >
              {horizontalLayout && listInput.length >= 3 ? (
                <>
                  <Flex
                    direction="row"
                    gap="4"
                    mb="4"
                    justifyContent="space-between"
                  >
                    <Box key={listInput[0].id ?? 0} w="276px">
                      {renderInput(listInput[0])}
                    </Box>
                    <Box key={listInput[1].id ?? 1} w="276px">
                      {renderInput(listInput[1])}
                    </Box>
                  </Flex>

                  <Box key={listInput[2].id ?? 2}>
                    {renderInput(listInput[2])}
                  </Box>
                </>
              ) : (
                listInput.map(renderInput)
              )}
            </Dialog.Body>

            <Dialog.Footer>
              <CustomButton
                background={
                  "linear-gradient(94.28deg, #B02736 10.37%, #634959 107.35%)"
                }
                p={"10px 16px"}
                gap={"8px"}
                borderRadius={"52px"}
                boxShadow={"0px 2px 2px 0px #00000040 inset"}
                textTransform={"none"}
                onClick={() => onSubmit(formValues)}
              >
                <Image src={addIcon} />
                <Text color={"#F7F7F7"} fontWeight={"600"} fontSize={"13px"}>
                  {btnMessage}
                </Text>
              </CustomButton>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default PopUp;
