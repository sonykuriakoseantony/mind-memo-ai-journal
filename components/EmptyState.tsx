import { BookOpen, PenLine } from "lucide-react";
import Button from "./ui/button";
import Link from "next/link";
import MMLink from "./ui/buttonLink";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
      <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center mb-6">
        <BookOpen className="w-10 h-10 text-muted-foreground" />
      </div>
      <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
        Your journal awaits
      </h2>
      <p className="text-muted-foreground max-w-sm mb-6">
        Start capturing your thoughts, track your moods, and let AI help you reflect on your journey.
      </p>
      <MMLink
        href={`/journal/new`}
        className="bg-primary hover:bg-accent/80 text-primary-foreground h-10 rounded-md px-4 py-2"
      >
        <PenLine className="w-4 h-4 mr-2" />
        Write your first entry
      </MMLink>
      <div className="flex justify-center pt-12">
            <img
              src="/auth-illustration.png"
              alt="Person journaling peacefully"
              className="w-72 h-72 object-contain drop-shadow-md"
            />
          </div>
    </div>
  );
}