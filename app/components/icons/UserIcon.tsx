import { createIcon } from "@chakra-ui/react";

export const UserIcon = createIcon({
  displayName: "UserIcon",
  defaultProps: {
    color: "#634959",
  },
  path: (
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 26">
      <path d="M17.5 10.5a5 5 0 1 1-10 0 5 5 0 0 1 10 0" fill="currentColor" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.99 25.49C5.323 25.223 0 19.733 0 13 0 6.096 5.596.5 12.5.5S25 6.096 25 13s-5.596 12.5-12.5 12.5h-.171q-.171 0-.339-.01m-7.511-4.602a1.893 1.893 0 0 1 1.577-2.504c4.872-.539 8.046-.49 12.895.012a1.87 1.87 0 0 1 1.56 2.5A11.2 11.2 0 0 0 23.75 13c0-6.213-5.037-11.25-11.25-11.25S1.25 6.787 1.25 13c0 3.073 1.232 5.858 3.229 7.887"
        fill="currentColor"
      />
    </svg>
  ),
});
