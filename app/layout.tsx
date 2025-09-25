import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import { TranslationLoader } from "@/components/translation-loader"
import { BusinessProfileHeader } from "@/components/business-profile-header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FabriiQ - The First School Operating System",
  description:
    "Co-create the future of educational technology with FabriiQ - the comprehensive School Operating System designed for modern educational excellence.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' style='stop-color:%236366f1;stop-opacity:1' /><stop offset='100%25' style='stop-color:%234338ca;stop-opacity:1' /></linearGradient></defs><rect width='100' height='100' rx='20' fill='url(%23grad)'/><g transform='translate(20,20)'><rect x='10' y='15' width='40' height='6' rx='3' fill='white'/><rect x='10' y='25' width='30' height='4' rx='2' fill='white' opacity='0.8'/><rect x='10' y='32' width='35' height='4' rx='2' fill='white' opacity='0.6'/><circle cx='45' cy='45' r='8' fill='white'/><path d='M41 45 L44 48 L49 42' stroke='%236366f1' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'/></g></svg>",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' style='stop-color:%236366f1;stop-opacity:1' /><stop offset='100%25' style='stop-color:%234338ca;stop-opacity:1' /></linearGradient></defs><rect width='100' height='100' rx='20' fill='url(%23grad)'/><g transform='translate(20,20)'><rect x='10' y='15' width='40' height='6' rx='3' fill='white'/><rect x='10' y='25' width='30' height='4' rx='2' fill='white' opacity='0.8'/><rect x='10' y='32' width='35' height='4' rx='2' fill='white' opacity='0.6'/><circle cx='45' cy='45' r='8' fill='white'/><path d='M41 45 L44 48 L49 42' stroke='%236366f1' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'/></g></svg>",
        type: "image/svg+xml",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="dark" 
          enableSystem={false}
          disableTransitionOnChange
          suppressHydrationWarning
        >
          <LanguageProvider>
            <TranslationLoader>
              <BusinessProfileHeader />
              {children}
            </TranslationLoader>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
