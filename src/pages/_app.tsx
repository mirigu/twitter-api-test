import { Provider } from "react-redux";
// redux
import { store } from "../redux/store";
// types
import type { AppProps } from "next/app";
// css
import "../../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
