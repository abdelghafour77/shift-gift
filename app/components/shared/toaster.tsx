"use client";

import {
  Toaster as ChakraToaster,
  Image,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
} from "@chakra-ui/react";
import { errorToasterIcon, successToasterIcon } from "../icons";

export const toaster = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
});

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: "4" }}>
        {(toast) => (
          <Toast.Root
            width={{ md: "sm" }}
            backgroundColor={
              toast.type === "error"
                ? "#FCE2E2"
                : toast.type === "success"
                  ? "#E0FEDE"
                  : "white"
            }
            alignItems={"center"}
          >
            {toast.type === "loading" ? (
              <Spinner size="sm" color="blue.solid" />
            ) : toast.type === "success" ? (
              <Image src={successToasterIcon} alt={"error icon"} />
            ) : (
              <Image src={errorToasterIcon} alt={"error icon"} />
            )}
            <Stack gap="1" flex="1" maxWidth="100%">
              {toast.title && (
                <Toast.Title
                  fontWeight={"500"}
                  fontSize={"13px"}
                  color={toast.type === "success" ? "#4BB543" : "#FF0000"}
                  lineHeight={"100%"}
                >
                  {toast.title}
                </Toast.Title>
              )}
              {toast.description && (
                <Toast.Description
                  fontWeight={"400"}
                  fontSize={"14px"}
                  color="#333333"
                  lineHeight={"18px"}
                >
                  {toast.description}
                </Toast.Description>
              )}
            </Stack>
            {toast.action && (
              <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
            )}
            {toast.meta?.closable && (
              <Toast.CloseTrigger
                top={"25%"}
                h={"50%"}
                borderLeft={"2px solid #FF00001A"}
                borderRadius={"none"}
                color={
                  toast.type === "error"
                    ? "red"
                    : toast.type === "success"
                      ? "green"
                      : "black"
                }
              />
            )}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  );
};
