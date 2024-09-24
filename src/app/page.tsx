import CrousalShowCard from "@/components/Crousals/CrousalShowCard";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import templateone from "../../public/temp1.jpg";

import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <span className="ml-2 text-lg font-bold text-primary">
            AppstoreScreenShots
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          {/* <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            About
          </Link> */}
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-12 lg:py-24 xl:py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Create stunning app screenshots in minutes
                </h1>
                <p className="mx-auto max-w-[700px] md:text-xl">
                  Elevate your app&apos;s presence with professional-grade
                  screenshots. Choose from our templates or customize your own.
                </p>
              </div>
              <div className="space-x-4 ">
                <Button
                  style={{ width: 300, height: 48 }}
                  className="bg-background text-primary hover:bg-background/90"
                >
                  <Link href="/TemplateOne">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-primary">
              Choose from our templates
            </h2>
            <div className="flex gap-6 justify-center">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-0">
                    <CrousalShowCard
                      imgSrc={templateone}
                      pageLink="/TemplateOne"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-primary">
              What our customers say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Alex Johnson",
                  comment:
                    "ScreenshotPro has revolutionized our app marketing. The templates are sleek and professional!",
                },
                {
                  name: "Sarah Lee",
                  comment:
                    "I can create beautiful screenshots in minutes. It's a game-changer for indie developers.",
                },
                {
                  name: "Michael Brown",
                  comment:
                    "The customization options are endless. Our app store presence has never looked better.",
                },
              ].map((testimonial, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-primary" />
                      ))}
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 mb-2">
                      {testimonial.comment}
                    </p>
                    <p className="font-semibold text-primary">
                      {testimonial.name}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to create stunning screenshots?
                </h2>
                <p className="mx-auto max-w-[600px] text-primary-foreground/90 md:text-xl">
                  Join thousands of satisfied users and take your app marketing
                  to the next level.
                </p>
              </div>
              <Button
                className="bg-background text-primary hover:bg-background/90"
                size="lg"
              >
                <Link href="/TemplateOne">Get Started Now</Link>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 AppstoreScreenShots. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
// export default function Home() {
//   return (
//     <main className="h-full w-full flex flex-row items-center justify-center">
//       <div className="">
//         <Card>
//           <CardHeader>
//             <CardTitle>Welcome to appstore screen shot gen </CardTitle>
//             <CardDescription>
//               Click on the template you want to create.
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="flex flex-grid gap-3">
//             <CrousalShowCard imgSrc={templateone} pageLink="/TemplateOne" />
//           </CardContent>
//         </Card>
//       </div>
//     </main>
//   );
// }
