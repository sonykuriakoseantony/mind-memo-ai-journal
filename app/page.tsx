import { BookOpen, Brain, Shield, Sparkles } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Insights",
    description: "Get mood analysis and smart summaries for every entry.",
  },
  {
    icon: Brain,
    title: "Reflect & Grow",
    description: "Track your emotional patterns and personal growth over time.",
  },
  {
    icon: Shield,
    title: "Private & Secure",
    description: "Your thoughts are encrypted and only accessible by you.",
  },
];

export default function Home() {
  return (
    <>
      {/* Left branding panel */}
      <div className="flex gradient-warm flex-col items-center justify-center p-12 relative overflow-hidden z-5">
        {/* Decorative circles */}
        {/* <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary/10 blur-2xl" /> */}
        {/* <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-accent/10 blur-3xl" /> */}

        <div className="relative z-10 text-center space-y-8">
          <div className="max-w-md mx-auto">
            <div className="flex justify-center mb-2">
            <div className="w-16 h-16 rounded-2xl bg-(image:--gradient-peach) flex items-center justify-center shadow-soft">
              <BookOpen className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>

          <div>
            <h1 className="font-display text-4xl font-semibold text-foreground mb-3">
              MindMemo
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Your personal AI-powered journal.<br></br>
              Capture your thoughts, understand your emotions, and grow every
              day.
            </p>
          </div>
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="flex lg:w-1/2 gradient-warm flex-col items-center justify-center p-5 relative overflow-hidden">
              <img
                src="/auth-illustration.png"
                alt="Person journaling peacefully"
                className="w-72 h-72 object-contain drop-shadow-md"
              />
            </div>

            <div className="space-y-4 text-left flex-1 p-5">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start gap-3">
                  <div className="mt-0.5 w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                    <feature.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
