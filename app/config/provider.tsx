"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { system } from "../theme";
import { Toaster } from "../components/shared/toaster";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      {children}
      <Toaster />
    </ChakraProvider>
  );
}
