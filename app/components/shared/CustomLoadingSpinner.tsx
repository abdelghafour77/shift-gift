// src/features/Home/components/CustomLoadingSpinner.tsx
import React from "react";
import { Box, Icon } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { LoadingIcon } from "../icons";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const CustomLoadingSpinner: React.FC = () => (
  <Box display="flex" justifyContent="center" alignItems="center">
    <Icon
      as={LoadingIcon}
      boxSize={9}
      animation={`${spin} 0.8s linear infinite`}
    />
  </Box>
);

export default CustomLoadingSpinner;
