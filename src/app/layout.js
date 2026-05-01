import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata = {
  title: "WaterPass | Urban Infrastructure Solutions",
  description: "Advanced technological solutions for urban climate infrastructure.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${montserrat.variable} bg-[#050D1D] text-white min-h-screen overflow-x-hidden`}>
        <div className="atmosphere-orbs">
          <div className="atmosphere-orb orb-1" />
          <div className="atmosphere-orb orb-2" />
          <div className="atmosphere-orb orb-3" />
        </div>
        <div className="global-bg" />
        <div className="global-overlay" />
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
