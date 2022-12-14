import "../styles/globals.css";
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "../utils/gql/client";

import Head from "next/head";
import { store } from "../redux/store";
import { Provider } from "react-redux";
function MyApp({ Component, pageProps }) {
  const cookie = true;
  return (
    <>
      <div>
        <ApolloProvider client={client}>
          <Provider store={store}>
            {cookie ? (
              <div className="flex h-screen">
                <div className="w-full h-screen overflow-hidden ">
                  <div className="w-full h-[100%] overflow-y-auto relative">
                    <Component {...pageProps} />
                  </div>
                </div>
              </div>
            ) : (
              <Component {...pageProps} />
            )}
          </Provider>
        </ApolloProvider>
      </div>
    </>
  );
}

export default MyApp;
