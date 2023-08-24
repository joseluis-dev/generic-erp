import '#styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { fetcher } from '#services/fetcher'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

const initialOptions = {
  'client-id': 'Af4jmL4eqPAH4wiuWE9FSDKHDGRIItZOdKwCyr6NRgakhQTON_gkqNiHw2UskH7PUhsypVUZlCBjqFxk',
  currency: 'USD',
  intent: 'capture'
}

export default function App ({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <SWRConfig value={{ fetcher }}>
        <Component {...pageProps} />
      </SWRConfig>
    </PayPalScriptProvider>
  )
}
