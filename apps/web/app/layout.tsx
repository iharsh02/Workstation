import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./provider";
import { Appbar } from "../components/appbar";

export const metadata: Metadata = {
  title: "Workstation",
  description: "Make your own social media workstation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-slate-900 to-neutral-900 min-h-screen">
        <Providers>
          <Appbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
