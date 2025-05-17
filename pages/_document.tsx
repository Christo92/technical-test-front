// pages/_document.tsx
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
import theme from "@theme/theme"; // adapte le chemin à ton projet

// Création du cache Emotion, clé 'css' par convention MUI Emotion
function createEmotionCache() {
  return createCache({ key: "css", prepend: true });
}

export default class MyDocument extends Document<{
  emotionStyleTags: React.ReactElement[];
}> {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage;

    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => (props) =>
          <App emotionCache={cache} {...props} />,
      });

    const initialProps = await Document.getInitialProps(ctx);

    // Extraction des styles Emotion critiques (SSR)
    const emotionChunks = extractCriticalToChunks(initialProps.html);
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

  render() {
    return (
      <Html lang="fr">
        <Head>
          {/* Theme color pour mobile */}
          <meta name="theme-color" content={theme.palette.primary.main} />

          {/* Injection des styles Emotion SSR */}
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
