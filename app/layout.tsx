import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://iwashita-naoto.github.io"),
  title: "岩下直人 | WONQ株式会社 代表取締役",
  description: "WONQ株式会社 代表取締役 岩下直人のプロフィールページ。XR技術とAI技術の専門家として、革新的なソリューションを提供しています。",
  keywords: ["岩下直人", "WONQ", "XR技術", "AI技術", "代表取締役"],
  authors: [{ name: "岩下直人" }],
  creator: "岩下直人",
  publisher: "WONQ株式会社",
  openGraph: {
    type: "profile",
    locale: "ja_JP",
    url: "https://iwashita-naoto.github.io/",
    siteName: "岩下直人 プロフィール",
    title: "岩下直人 | WONQ株式会社 代表取締役",
    description: "WONQ株式会社 代表取締役 岩下直人のプロフィールページ。XR技術とAI技術の専門家として、革新的なソリューションを提供しています。",
    images: [
      {
        url: "/images/profile.jpg",
        width: 800,
        height: 800,
        alt: "岩下直人のプロフィール写真",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "岩下直人 | WONQ株式会社 代表取締役",
    description: "WONQ株式会社 代表取締役 岩下直人のプロフィールページ",
    images: ["/images/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
