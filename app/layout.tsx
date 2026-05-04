import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "BlueLink",
  description:
    "India-scale workforce platform for verified blue-collar workers and trusted employers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
