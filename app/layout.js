import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SessionWrapper from "../components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Homepage | Fund-Raise",
  description: "This website is a corwdfunding platform for developers to fund their projects",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-white min-h-[calc(100vh-160px)] bg-blue-950 bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
        <SessionWrapper>
          <Navbar />
          <div className="text-white min-h-[calc(100vh-160px)] bg-blue-950 bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
            {children}
          </div>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
