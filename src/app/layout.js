import "./globals.css";
import { cx } from "@/src/utils";
import { Inter, Manrope } from "next/font/google";
import Header from "@/src/components/Header";
import Footer from "../components/Footer";
import siteMetadata from "../utils/siteMetaData";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { GoogleAnalytics } from '@next/third-parties/google'
import ChunkErrorHandler from "@/src/components/ChunkErrorHandler";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6aW-m6F0Opk4O8gGTGAsWEXOjttW89SY",
  authDomain: "its-kishan-blogs.firebaseapp.com",
  projectId: "its-kishan-blogs",
  storageBucket: "its-kishan-blogs.firebasestorage.app",
  messagingSenderId: "1084956102233",
  appId: "1:1084956102233:web:0a0716131556757027ab48",
  measurementId: "G-TT3EY5TMEH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-in",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mr",
});

export const metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    template: `%s | ${siteMetadata.title}`,
    default: siteMetadata.title, // a default is required when creating a template
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    images: [siteMetadata.socialBanner],
  },
};

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <head>
//       <meta name="google-site-verification" content="McjDFinAT3-_a-fnc6Fa5vhrp91ttMtzvxUXOPFVrJs" />
//       </head>
//       <body
//         className={cx(
//           inter.variable,
//           manrope.variable,
//           "font-mr bg-light dark:bg-dark"
//         )}
//       >
//         <Script id="theme-switcher" strategy="beforeInteractive">
//           {`if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
//     document.documentElement.classList.add('dark')
//   } else {
//     document.documentElement.classList.remove('dark')
//   }`}
//         </Script>
//         <SpeedInsights/>
//         <Analytics/>
//         <Header />
//         {children}
//         <Footer />
//       </body>
//       <GoogleAnalytics gaId="G-SDG5E7TL7J" />
//     </html>
//   );
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="McjDFinAT3-_a-fnc6Fa5vhrp91ttMtzvxUXOPFVrJs"
        />
      </head>
      <body className={cx(inter.variable, manrope.variable, "font-mr bg-light dark:bg-dark")}>
        <Script id="theme-switcher" strategy="beforeInteractive">
          {`if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }`}
        </Script>

        {/* This will catch chunk errors in the browser */}
        <ChunkErrorHandler />

        <SpeedInsights />
        <Analytics />
        <Header />
        {children}
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-SDG5E7TL7J" />
    </html>
  );
}
