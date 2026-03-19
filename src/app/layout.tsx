import Header from "@/components/Header/Header";
import ToastProvider from "@/components/Providers/ToastProvider";
import { geistMono, geistSans } from "@/lib/fonts";
import { ReactNode } from "react";
import "./globals.css";

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="bg-white">
        <Header />

        <main className="mx-auto max-w-7xl">{children}</main>

        <ToastProvider />
      </body>
    </html>
  );
};

export default RootLayout;
