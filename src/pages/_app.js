import "@/styles/globals.css";
import { useEffect } from 'react';
import emailjs from '@emailjs/browser';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    emailjs.init("ktapZhoMJLZGi6_zB");
  }, []);

  return <Component {...pageProps} />;
}
