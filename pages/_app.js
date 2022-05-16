import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { wrapper } from "../store";
import Layout from "../components/Layout";
import "../styles/globals.css";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Head>
          <script
            type="text/javascript"
            src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=fs6pw6f8ex"
          ></script>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}

export default wrapper.withRedux(MyApp);
