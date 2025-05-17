import "@styles/globals.css";
import type { AppProps } from "next/app";
import { GlobalProvider } from "@state/global-context";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "@theme/theme";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createCache from "@emotion/cache";

import { Poppins } from "next/font/google";

// Charge la font Poppins avec les poids et options voulues
const poppins = Poppins({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap", // évite le FOIT, font-display: swap
  preload: true, // précharge automatiquement
});

const clientSideEmotionCache = createCache({ key: "css", prepend: true });

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* Applique la font via la className */}
        <main className={poppins.className}>
          <GlobalProvider>
            <Component {...pageProps} />
          </GlobalProvider>
        </main>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
