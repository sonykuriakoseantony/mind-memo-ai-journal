"use client";
import { BookOpen, LogOut, PenLine } from "lucide-react";
import Button from "./ui/button";
import MMLink from "./ui/buttonLink";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const navigate = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userStr = sessionStorage.getItem("user");
    if (token && userStr) {
      const user = JSON.parse(userStr);
      setIsLoggedIn(true);
      setUserName(user.name);
    }
  }, [pathname]);

  const logout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (!res.ok) {
        throw new Error("Logout failed");
      } else {
        navigate.push("/");
        navigate.refresh();
        sessionStorage.clear();
        setIsLoggedIn(false);
        setUserName("");
      }
    } catch (err) {
      console.error(err);
      alert("Logout failed");
    }
  };

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
              {isLoggedIn && (
                <p className="text-xs text-muted-foreground hidden sm:block">
                  {userName}
                </p>
              )}
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <MMLink
                  href={`/journal/new`}
                  className="bg-primary hover:bg-accent/80 text-primary-foreground h-9 rounded-md px-3"
                >
                  <PenLine className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">New Entry</span>
                </MMLink>

                <Button
                  onClick={logout}
                  className="text-muted-foreground hover:text-foreground hover:bg-accent/80 h-9 rounded-md px-3"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <MMLink
                  href={`/register`}
                  className="bg-primary hover:bg-accent/80 text-primary-foreground h-9 rounded-md px-3"
                >
                  <span className="hidden sm:inline">Get Started</span>
                </MMLink>

                <MMLink
                  href={`/login`}
                  className="text-muted-foreground hover:text-foreground hover:bg-accent/80 h-9 rounded-md px-3"
                >
                  Sign In
                </MMLink>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
