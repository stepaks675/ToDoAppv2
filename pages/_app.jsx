import "../styles/global.css";
import { Provider } from "react-redux";
import store from "../service/store/store";
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div className="text-slate-600 font-mono">
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
