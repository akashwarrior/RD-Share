import type { Metadata } from "next";
import { Inter } from "next/font/google"
import Header from "@/components/header";
import Footer from "@/components/footer";
import Providers from "@/components/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  icons: './icon.svg',
  title: "MeetSync - Professional Video Conferencing",
  description: "Connect securely with end-to-end encryption. Host video meetings, share your screen, and collaborate with just a few clicks.",
  keywords: "video conferencing, online meetings, screen sharing, collaboration, end-to-end encryption, secure communication",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html >
  );
}
