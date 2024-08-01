import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import { theme } from "./theme";
import "./globals.css";
import { CollapseDesktop } from "@/common/components/CollapseDesktop";
import { Navbar } from "@/common/components/Navbar";
import { ScrollToTop } from "@/common/components/ScrollToTop";

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
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider defaultColorScheme="dark" theme={theme}>
          <CollapseDesktop navbar={<Navbar showAuthButton />}>
            <div className="relative isolate mb-32">
              {children}
            </div>
          </CollapseDesktop>
          <ScrollToTop />
        </MantineProvider>
      </body>
    </html>
  );
}
