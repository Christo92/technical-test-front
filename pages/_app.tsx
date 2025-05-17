import "@styles/globals.css";
import type { AppProps } from "next/app";
import { GlobalProvider } from "@state/global-context";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "@theme/theme";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createCache from "@emotion/cache";

import { Poppins } from "next/font/google";

/**
 * Loads the Poppins font with specified weights and subsets.
 * Uses font-display: swap to avoid FOIT (Flash of Invisible Text).
 * Preloads the font for better performance.
 */
const poppins = Poppins({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap", // avoids FOIT by using font-display: swap
  preload: true, // preload font automatically
});

/**
 * Client-side Emotion cache instance.
 * Used to cache styles for MUI and Emotion on the client.
 */
const clientSideEmotionCache = createCache({ key: "css", prepend: true });

/**
 * Extended AppProps interface to optionally accept an EmotionCache instance.
 */
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

/**
 * Custom App component to initialize pages.
 * Wraps the app with Emotion CacheProvider, MUI ThemeProvider, global CSS baseline,
 * Google Fonts, and a global context provider.
 */
function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache, // fallback to client-side cache if not provided
}: MyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline provides a consistent baseline for Material UI styling */}
        <CssBaseline />
        {/* Apply Poppins font via the className on the main element */}
        <main className={poppins.className}>
          {/* Wrap the entire app in a global context provider */}
          <GlobalProvider>
            {/* Render the page component with its props */}
            <Component {...pageProps} />
          </GlobalProvider>
        </main>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
