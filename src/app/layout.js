import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import ParticlesBackground from "@/components/ParticlesBackground";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata = {
  title: "WaterPass | Urban Infrastructure Solutions",
  description: "Advanced technological solutions for urban climate infrastructure.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${montserrat.variable} bg-[#1a1a1a] text-white min-h-screen overflow-x-hidden`}>
        <ParticlesBackground />
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
