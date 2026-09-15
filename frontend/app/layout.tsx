import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fahad Khan — Full-Stack AI Engineer",
  description:
    "Portfolio of Fahad Khan. Full-Stack AI Engineer building intelligent digital products where engineering, AI, and design converge.",
  keywords: [
    "Fahad Khan",
    "Full-Stack AI Engineer",
    "Next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "Prisma ORM",
    "Neon Database",
    "Tailwind CSS",
    "Cloudinary",
    "REST APIs",
    "RAG",
    "Vercel",
    "Render",
  ],
  authors: [{ name: "Fahad Khan" }],
  creator: "Fahad Khan",
  openGraph: {
    title: "Fahad Khan — Full-Stack AI Engineer",
    description: "Building intelligent digital products where engineering, AI, and design converge.",
    type: "website",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <body
        suppressHydrationWarning
        className="antialiased selection:bg-[#8C7BFF] selection:text-[#0A0A0C]"
      >
        {/* Fixed Noise Grain Overlay */}
        <div className="grain-overlay" aria-hidden="true" />
        
        {/* Fixed Inset Vignette Overlay */}
        <div className="vignette-overlay" aria-hidden="true" />

        {/* Custom Desktop Interactive Cursor */}
        <CustomCursor />

        {/* Main Content */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
