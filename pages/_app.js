import { QueryClient, QueryClientProvider } from "react-query";
import { store, wrapper, persistor } from "../store";
import Layout from "../components/Layout";
import "../styles/globals.css";
import Head from "next/head";
import { APIProvider } from "../utils/hook/api";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <APIProvider baseURL={process.env.NEXT_PUBLIC_BASE_URL}>
            <Layout>
              <Head>
                <script
                  type="text/javascript"
                  src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_CLIENT_ID}&callback=CALLBACK_FUNCTION`}
                ></script>
              </Head>
              <Component {...pageProps} />
            </Layout>
          </APIProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default wrapper.withRedux(MyApp);
