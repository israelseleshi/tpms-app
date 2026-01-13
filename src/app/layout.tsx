import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SearchProvider } from "@/context/SearchContext";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Trademark Practice Management System",
  description:
    "Professional practice management for trademark portfolios, filings, and invoicing.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(publicSans.variable, "bg-slate-50 text-slate-900 antialiased")}
      >
        <SearchProvider>{children}</SearchProvider>
      </body>
    </html>
  );
}
