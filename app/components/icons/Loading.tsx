import { createIcon } from "@chakra-ui/react";

export const LoadingIcon = createIcon({
  displayName: "Loading",
  path: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48">
      <rect width="4" height="12" x="22" fill="#B02736" rx="2"></rect>
      <rect
        width="4"
        height="12"
        y="26"
        fill="#E4818C"
        rx="2"
        transform="rotate(-90 0 26)"
      ></rect>
      <rect
        width="4"
        height="12"
        x="26"
        y="48"
        fill="#EFB4BA"
        rx="2"
        transform="rotate(180 26 48)"
      ></rect>
      <rect
        width="4"
        height="12"
        x="48"
        y="22"
        fill="#F9E6E8"
        rx="2"
        transform="rotate(90 48 22)"
      ></rect>
      <rect
        width="4"
        height="12"
        x="5.615"
        y="8.444"
        fill="#D53F4F"
        rx="2"
        transform="rotate(-45 5.615 8.444)"
      ></rect>
      <rect
        width="4"
        height="12"
        x="8.444"
        y="42.385"
        fill="#E99AA3"
        rx="2"
        transform="rotate(-135 8.444 42.385)"
      ></rect>
      <rect
        width="4"
        height="12"
        x="42.385"
        y="39.556"
        fill="#F4CDD1"
        rx="2"
        transform="rotate(135 42.385 39.556)"
      ></rect>
      <rect
        width="4"
        height="12"
        x="39.556"
        y="5.615"
        fill="#FDF7F7"
        rx="2"
        transform="rotate(45 39.556 5.615)"
      ></rect>
    </svg>
  ),
});
