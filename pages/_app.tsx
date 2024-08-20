import Layout from "@/layouts";
import { store } from "@/redux/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps | any) {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={<div className="h-screen w-full flex justify-center items-center">Please wait while data is loading...</div>} persistor={persistor}> */}
      <Layout layout={Component.layout} data={pageProps.data}>
        <Component {...pageProps} />
      </Layout>
      {/* </PersistGate> */}
    </Provider>
  );
}
