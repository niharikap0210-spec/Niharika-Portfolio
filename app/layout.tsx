import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "Niharika Pundlik — Product Designer",
  description: "Designing with empathy, researching with curiosity, delivering delightful interactions. Product Designer with a background in HCI and Architecture.",
  openGraph: {
    title: "Niharika Pundlik — Product Designer",
    description: "Product Designer crafting thoughtful digital experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <PageTransition>
          <main className="min-h-screen">{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
