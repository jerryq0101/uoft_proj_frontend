import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ChakraProvider } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prerequisite Visualizer",
  description: "To visualize the prerequisite tree(s) of a course(s) at UofT and easily see if you are able to take it. You can also visualize commonalities between different courses and their prerequisites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
