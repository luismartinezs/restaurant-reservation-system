import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import { theme } from "./theme";
import "./globals.css";
import { CollapseDesktop } from "@/common/components/CollapseDesktop";
import { Navbar } from "@/common/components/Navbar";
import { ScrollToTop } from "@/common/components/ScrollToTop";
import { cn } from "@/common/utils";

const inter = Inter({ subsets: ["latin"] });

const defaultUrl = `https://${process.env.SITE_URL ?? "localhost:3000"}`;

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Rico Rico",
  description: "Book a table at your favorite restaurant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body
        className={cn(inter.className, "overflow-x-hidden overflow-y-visible")}
      >
        <MantineProvider defaultColorScheme="dark" theme={theme}>
          <CollapseDesktop navbar={<Navbar showAuthButton />}>
            <div className="relative isolate mb-32">{children}</div>
          </CollapseDesktop>
          <ScrollToTop />
        </MantineProvider>
        {/* <Script src="https://accounts.google.com/gsi/client" async /> */}
        {process.env.NODE_ENV === "production" && (
          <Script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id="d036308e-e9c2-4d50-86b8-908670805a69"
          />
        )}
      </body>
    </html>
  );
}
