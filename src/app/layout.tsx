import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";
import { Analytics } from "@vercel/analytics/react";
import NavHeader from "@/components/Nav/NavHeader";
import Slidebar from "@/components/slidebarComponents/Slidebar";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "AppstoreScreenShots  | App Store Screenshot Generator | Free for iOS &amp; Android",
  description:
    "Effortlessly design high-quality, designer-grade screenshots for iOS &amp; Android app stores with AppScreens. Save hours with our screenshot generator, supporting all sizes for App Store &amp; Google Play. Try it for free and elevate your app's presence today! Work with a single responsive design to generate app store-ready images for all iOS and Android devices, from phones and tablets to watches and laptops. Catering to both App Store Connect and Google Play, receive pixel-perfect JPEG and PNG files ready to upload. Our smart-export ensures perfect sizing across all devices and languages. Jump right in and simplify your app release today.",
  keywords:
    "appscreens,app screens,appscreens.com,app screenshot generator,screenshot maker,app screenshot maker,screenshot creator,app screenshot creator,create app screenshots,screenshot generator,app store image,google play image,ios screenshot,android screenshot,applaunchpad,shotbot,appure,mockup,mockup generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const currentUrl = headers().get("referer");
  // let path;
  // if (currentUrl) {
  //   const paths = currentUrl!.split("/");
  //   path = paths[paths.length - 1];
  //   console.log(path);
  // }
  //console.log(currentUrl);

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
