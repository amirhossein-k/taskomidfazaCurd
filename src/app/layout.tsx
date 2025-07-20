
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import LoadingUser from "./(public)/users/loading";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "User Curd OmidFaza",
  description: "task for join by Nextjs 15 redux and api",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" >
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  container mx-auto min-h-screen p-4 flex flex-col   `}
      >

        <Providers >
            <Toaster position="top-center" />

       
       <Suspense fallback={ <LoadingUser />}>
            <div className="main">{children}</div>
          </Suspense>
              <footer className="text-center text text-sm text-gray-500 py-4">
                ساخته شده توسط امیرحسین کریمی
        </footer>
        </Providers>
      </body>
    </html>
  );
}
