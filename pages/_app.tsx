import '@styles/globals.css';
import type { AppProps } from 'next/app';
import { GlobalProvider } from '@state/global-context';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '@theme/theme';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createCache from '@emotion/cache';

const clientSideEmotionCache = createCache({ key: 'css', prepend: true });

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalProvider>
          <Component {...pageProps} />
        </GlobalProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
