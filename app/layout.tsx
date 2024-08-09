import type { Metadata } from "next";
// import Script from 'next/script'
import { Inter } from "next/font/google";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import { theme } from "./theme";
import "./globals.css";
import { CollapseDesktop } from "@/common/components/CollapseDesktop";
import { Navbar } from "@/common/components/Navbar";
import { ScrollToTop } from "@/common/components/ScrollToTop";
import { cn } from "@/common/utils";

storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin],
});

const inter = Inter({ subsets: ["latin"] });

const defaultUrl = process.env.SITE_URL
  ? `https://${process.env.SITE_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Restaurant Reservation System",
  description: "A restaurant reservation system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript
          defaultColorScheme="dark"
        />
      </head>
      <body className={cn(inter.className, "overflow-x-hidden")}>
        <MantineProvider defaultColorScheme="dark" theme={theme}>
          <CollapseDesktop navbar={<Navbar showAuthButton />}>
            <div className="relative isolate mb-32">{children}</div>
          </CollapseDesktop>
          <ScrollToTop />
        </MantineProvider>
        {/* <Script src="https://accounts.google.com/gsi/client" async /> */}
      </body>
    </html>
  );
}
