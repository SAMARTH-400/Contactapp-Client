import "../styles/globals.css";
import { AuthContextProvider } from "../context/AuthContext";
import { ToastContextProvider } from "../context/ToastContext";

export default function App({ Component, pageProps }) {
  return (
    <ToastContextProvider>
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
    </ToastContextProvider>
  )
}
