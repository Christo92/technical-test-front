import React from "react";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import createCache from "@emotion/cache";
import theme from "@theme/theme"; // adjust the path to your project

/**
 * Creates an Emotion cache instance with the key 'css'.
 * This cache is used by MUI to prepend styles properly.
 * @returns {EmotionCache} The Emotion cache instance
 */
function createEmotionCache() {
  return createCache({ key: "css", prepend: true });
}

/**
 * Custom Document component to augment the application's <html> and <body> tags.
 * Handles server-side rendering (SSR) of Emotion styles for Material UI.
 */
export default class MyDocument extends Document<{
  emotionStyleTags: React.ReactElement[];
}> {
  /**
   * Override the default getInitialProps to extract Emotion critical CSS on server side.
   * This prevents FOUC (flash of unstyled content) by injecting styles into the server-rendered HTML.
   * @param ctx - Document context containing renderPage function and other data.
   * @returns Props including initial props and Emotion style tags.
   */
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage;

    // Create an Emotion cache instance
    const cache = createEmotionCache();
    // Extract critical CSS chunks from Emotion cache for SSR
    const { extractCriticalToChunks } = createEmotionServer(cache);

    // Override renderPage to wrap the app and provide the Emotion cache via props
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => (props) =>
          <App emotionCache={cache} {...props} />,
      });

    // Get the initial document props from Next.js
    const initialProps = await Document.getInitialProps(ctx);

    // Extract critical Emotion styles from the rendered HTML
    const emotionChunks = extractCriticalToChunks(initialProps.html);
    // Generate style tags for Emotion critical CSS to be injected into <head>
    const emotionStyleTags = emotionChunks.styles.map((style) => (
      <style
        key={style.key}
        data-emotion={`${style.key} ${style.ids.join(" ")}`}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ));

    return {
      ...initialProps,
      emotionStyleTags,
    };
  }

  /**
   * Render the custom document structure.
   * Injects Emotion SSR styles and theme color meta tag.
   */
  render() {
    return (
      <Html lang="fr">
        <Head>
          {/* Mobile theme color */}
          <meta name="theme-color" content={theme.palette.primary.main} />

          {/* Inject Emotion critical CSS styles extracted during SSR */}
          {this.props.emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
