import { createIcon } from "@chakra-ui/react";

export const DropdownIcon = createIcon({
  displayName: "DropdownIcon",
  defaultProps: {
    color: "#634959",
  },
  path: (
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 8">
      <path
        d="m1 1.5 5 5 5-5"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
});
