// src/components/icons/solarEye.tsx
import { createIcon } from "@chakra-ui/react";

export const SolarEye = createIcon({
  displayName: "SolarEye",
  viewBox: "0 0 22 13",
  path: (
    <>
      <g filter="url(#filter0_d_4_27)">
        <path
          fill="#333"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M.606.08a1 1 0 0 1 1.313.526L1 1l.92-.394.003.008.021.045.094.194c.086.172.219.424.4.729a13.4 13.4 0 0 0 1.67 2.237q.285.306.59.592C6.18 5.8 8.251 7 11 7a8.7 8.7 0 0 0 3.22-.602c1.227-.483 2.254-1.21 3.096-1.998A13 13 0 0 0 20.049.675l.027-.058.005-.011a1 1 0 0 1 1.838.788l-.002.005-.004.008-.011.026-.04.087q-.334.695-.741 1.348c-.5.803-1.073 1.558-1.711 2.256l.797.797a1 1 0 0 1-1.414 1.415l-.84-.84q-.889.718-1.897 1.256l.782 1.202a1.001 1.001 0 1 1-1.676 1.091l-.986-1.514c-.679.208-1.404.355-2.176.424V10.5a1 1 0 0 1-2 0V8.956c-.775-.07-1.5-.217-2.177-.425l-.985 1.514a1 1 0 0 1-1.676-1.09l.782-1.203c-.7-.37-1.332-.8-1.897-1.257l-.84.84a1 1 0 0 1-1.414-1.414l.797-.797A15.4 15.4 0 0 1 .72 2.605a14 14 0 0 1-.591-1.107l-.033-.072-.01-.021-.002-.007-.001-.002C.08 1.396.08 1.394 1 1l-.919.395A1 1 0 0 1 .606.08"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_4_27"
          x="0"
          y="-0.001"
          width="21.995"
          height="12.501"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_4_27" />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_4_27"
            result="shape"
          />
        </filter>
      </defs>
    </>
  ),
});
