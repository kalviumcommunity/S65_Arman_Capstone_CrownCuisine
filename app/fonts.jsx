import localFont from "next/font/local";

export const instrumentSans = localFont({
  src: [
    {
      path: "./fonts/InstrumentSans-VariableFont_wdth,wght.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "./fonts/InstrumentSans-Italic-VariableFont_wdth,wght.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  display: "swap",
  preload: true,
});

export const instrumentSerif = localFont({
  src: [
    {
      path: "./fonts/InstrumentSerif-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/InstrumentSerif-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  display: "swap",
  preload: true,
});

export const chivoMono = localFont({
  src: [
    {
      path: "./fonts/ChivoMono-VariableFont_wght.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "./fonts/ChivoMono-Italic-VariableFont_wght.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  display: "swap",
  preload: true,
});

export const funnelSans = localFont({
  src: [
    {
      path: "./fonts/FunnelSans-VariableFont_wght.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "./fonts/FunnelSans-Italic-VariableFont_wght.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  display: "swap",
  preload: true,
});
