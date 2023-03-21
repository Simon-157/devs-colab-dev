import UserProvider from "@/contexts/userContext";
import "@/styles/globals.css";
import "@/styles/styles.scss";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </UserProvider>
     
    </QueryClientProvider>
  );
}
