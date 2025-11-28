import { HeroWithMockup } from "./ui/hero-with-mockup"
import { DashboardMockup } from "./ui/dashboard-mockup-enhanced"
import { Github } from "lucide-react"

export function HeroDemo() {
  return (
    <HeroWithMockup
      title="Build your online store in minutes, not months"
      description="Create sophisticated e-commerce applications with our intuitive platform. Sync with Google Sheets, customize designs, and start selling instantly."
      primaryCta={{
        text: "Start Building",
        href: "/signup",
      }}
      secondaryCta={{
        text: "View on GitHub",
        href: "https://github.com/sellpoint-io",
        icon: <Github className="mr-2 h-4 w-4" />,
      }}
      mockupImage={{
        alt: "Sellpoint.io Dashboard",
        width: 1248,
        height: 765,
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1248&h=765&fit=crop&crop=center"
      }}
      customMockup={<DashboardMockup />}
    />
  )
}