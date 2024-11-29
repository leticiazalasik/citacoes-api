import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Main from '@/components/layout/Main';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen flex flex-col">
      
      <Main>
        <Component {...pageProps} />
      </Main>
      
    </div>
  );
}