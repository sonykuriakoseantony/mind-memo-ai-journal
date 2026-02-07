import React from "react";
import Button from "./ui/button";
import { MoodBadge } from "./MoodBadge";
import { Pencil, Sparkle, Trash2 } from "lucide-react";

export default function JournalCard() {
  return (
    <div className="container">
      <div className="group rounded-lg border border-border/50 bg-card text-card-foreground shadow-sm hover:shadow-card transition-all duration-300 animate-slide-up">
        <div className="flex flex-col space-y-1.5 p-6 pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-xl font-semibold text-foreground truncate">
                entry 2
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                February 6, 2026 at 10:13 PM
              </p>
            </div>

            <MoodBadge sentiment={"energetic"} emoji={"energetic"}></MoodBadge>
          </div>
        </div>

        <div className="p-6 pt-0">
          <div className="prose prose-sm max-w-none text-foreground/80">
            <p className="whitespace-pre-wrap leading-relaxed">description 2</p>
          </div>

          <div
            className="mt-4 pt-4 flex items-center gap-2
               border-t border-border/50"
          >
            <Button className="h-9 rounded-md px-3 text-muted-foreground hover:bg-accent/80 hover:text-white">
              <Pencil  className="w-4 h-4 mr-1.5"/> Edit
            </Button>
            <Button className="h-9 rounded-md px-3 text-muted-foreground hover:bg-accent/80 hover:text-white">
              <Sparkle className="w-4 h-4 mr-1.5"/> Generate Summary
            </Button>

            <Button className="h-9 rounded-md px-3 text-muted-foreground hover:bg-accent/80 hover:text-white ml-auto">
              <Trash2  className="w-4 h-4 mr-1.5"/> Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
