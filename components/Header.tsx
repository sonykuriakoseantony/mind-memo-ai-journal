import { BookOpen, LogOut, PenLine } from "lucide-react";
import Button from "./ui/button";

export default function Header() {
  return (
    <>
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-(image:--gradient-peach) flex items-center justify-center shadow-soft">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-xl font-semibold text-foreground">
                MindMemo
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                sony@mindmemo.com
              </p>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2">
            <Button className="bg-primary hover:bg-accent/80 text-primary-foreground h-9 rounded-md px-3">
              <PenLine className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">New Entry</span>
            </Button>

            <Button className="text-muted-foreground hover:text-foreground hover:bg-accent/80 h-9 rounded-md px-3">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}
