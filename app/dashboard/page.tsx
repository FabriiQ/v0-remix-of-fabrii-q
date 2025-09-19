"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"
import { GraduationCap, HeartHandshake, User2, Users2, Zap } from "lucide-react"
import Link from "next/link"
import { Icons } from "@/components/icons"

const features = [
  {
    name: "Engaging Learning Experience",
    description: "Interactive lessons and real-world projects make learning fun and effective.",
    icon: GraduationCap,
  },
  {
    name: "Personalized Mentorship",
    description: "Receive guidance and support from experienced mentors to achieve your goals.",
    icon: User2,
  },
  {
    name: "Collaborative Community",
    description: "Connect with fellow learners, share ideas, and build lasting relationships.",
    icon: Users2,
  },
  {
    name: "Career Advancement",
    description: "Gain in-demand skills and access career resources to unlock new opportunities.",
    icon: HeartHandshake,
  },
]

const testimonials = [
  {
    name: "Sarah L.",
    title: "Software Engineer",
    quote: "I landed my dream job after completing this program. The skills I learned were invaluable.",
    image: "/placeholder-user.jpg",
  },
  {
    name: "David M.",
    title: "Data Scientist",
    quote: "The mentorship and community support were exceptional. I highly recommend this platform.",
    image: "/placeholder-user.jpg",
  },
  {
    name: "Emily R.",
    title: "UX Designer",
    quote: "I transformed my career with this program. The curriculum is comprehensive and up-to-date.",
    image: "/placeholder-user.jpg",
  },
]

export default function DashboardPage() {
  return (
    <div className="container relative">
      <header className="flex items-center justify-between py-10">
        <Link href="#" className="flex items-center space-x-2">
          <Icons.logo className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">Acme Corp</span>
        </Link>
        <div className="flex items-center space-x-2">
          <ModeToggle />
          <Link href="/login" className={cn(Button, "bg-background hover:bg-secondary")}>
            Login
          </Link>
          <Link href="/sign-up" className={cn(Button, "bg-primary text-primary-foreground hover:bg-primary/90")}>
            Sign Up
          </Link>
        </div>
      </header>
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-6 lg:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Unlock Your Potential with Expert-Led Courses
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Transform your career with our comprehensive online courses. Learn from industry experts and gain
                in-demand skills.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => (window.location.href = "/services")}
                variant="outline"
                size="lg"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3"
              >
                Services
              </Button>
              <Button
                onClick={() => (window.location.href = "/consultation")}
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-medium px-8 py-3"
              >
                <Zap className="w-5 h-5 mr-2" />
                Free Consultation
              </Button>
            </div>
          </div>
          <img
            src="/hero-image.png"
            alt="Hero Image"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
          />
        </div>
      </section>
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <feature.icon className="h-5 w-5 text-primary" />
                    <span>{feature.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl">What Our Students Say</h2>
          <p className="max-w-[800px] text-gray-500 mx-auto mt-4 text-center md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Don't just take our word for it. See how our courses have helped students achieve their goals.
          </p>
          <Carousel className="container mt-12">
            <CarouselContent className="-ml-1 md:ml-0">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-4">
                    <Card className="border-none shadow-md">
                      <CardHeader>
                        <div className="flex items-center space-x-4">
                          <img
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            className="h-12 w-12 rounded-full"
                          />
                          <div>
                            <CardTitle>{testimonial.name}</CardTitle>
                            <CardDescription>{testimonial.title}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700">{testimonial.quote}</p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </section>
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container">
          <div className="grid items-center gap-6 lg:grid-cols-2">
            <img
              src="/cta-image.png"
              alt="CTA Image"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Transform Your Career?</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join our community of learners and start your journey towards a brighter future.
                </p>
              </div>
              <Button
                onClick={() => (window.location.href = "/sign-up")}
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium"
              >
                Get Started Today
              </Button>
            </div>
          </div>
        </div>
      </section>
      <footer className="border-t py-12">
        <div className="container flex flex-col items-center justify-between md:flex-row">
          <p className="text-gray-500">&copy; {new Date().getFullYear()} Acme Corp. All rights reserved.</p>
          <div className="mt-4 flex space-x-4 md:mt-0">
            <Link href="#" className="text-gray-500 hover:text-gray-700">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-700">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
