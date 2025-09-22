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
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%231F504B'/><text x='50' y='65' fontFamily='Arial,sans-serif' fontSize='60' fontWeight='bold' textAnchor='middle' fill='white'>F</text></svg>",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%231F504B'/><text x='50' y='65' fontFamily='Arial,sans-serif' fontSize='60' fontWeight='bold' textAnchor='middle' fill='white'>F</text></svg>",
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
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
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
