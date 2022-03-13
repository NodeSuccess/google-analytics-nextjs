import { AnalysticsProvider } from '../components/analytics-provider'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AnalysticsProvider />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
