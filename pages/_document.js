import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="tr">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Modern ve şık mobilya çözümleri - Vivense tarzı mobilya mağazası" />
        <meta name="keywords" content="mobilya, furniture, modern mobilya, ev dekorasyonu, yatak odası, oturma odası" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
