"use client";
import Button from "@/components/ui/button";
import { X, Save, Sparkles, RefreshCcw, Loader2 } from "lucide-react";
import React, { useState } from "react";
import MMLink from "./ui/buttonLink";

export default function EntryForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const isValid = title.trim() && content.trim();
  const isLoading = isAnalyzing;

  const handleSaveEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Inside saving entry");
    
    if (!isValid) {
      alert("Please fill the title and content fields to create a new Entry!");
      return;
    } else {
      try {

        setIsAnalyzing(true);
       
        const userStr = sessionStorage.getItem("user");
        const user = JSON.parse(userStr || "");
        const userId = user ? user._id : "";

        const formData = {
          userId,
          title,
          content
        };

        const res = await fetch("/api/journals", {
          method: "POST",
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        console.log(data);

        if (res.status == 201) {
          alert("Blog created successfully");
          resetForm();
        }

      } catch (err) {
        console.log(err);
        console.log("Error creating new entry. Try again!");
      } finally {
        setIsAnalyzing(false);
      }
    }
  }

  const resetForm = () => {
        setTitle("");
        setContent("");
    }

  return (
    <>
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm border-border/50 animate-scale-in">
            {/* Header */}
            <div className="flex flex-col space-y-1.5 p-6 pb-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl font-semibold tracking-tight">
                  New Journal Entry
                </h3>

                <MMLink
                  href="/journals"
                  className="h-10 w-10 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </MMLink>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 pt-0 space-y-4">
              {/* Title */}
              <div>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="flex h-10 w-full rounded-md border bg-background
                           px-3 py-2 text-lg 
                           ring-offset-background
                           placeholder:text-muted-foreground
                           focus-visible:outline-none focus-visible:ring-2
                           focus-visible:ring-ring focus-visible:ring-offset-2
                           disabled:cursor-not-allowed disabled:opacity-50
                           md:text-sm border-border/50
                           focus:border-primary/50"
                  placeholder="What's on your mind?"
                />
              </div>

              {/* Body */}
              <div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={10}
                  placeholder="Write your thoughts, feelings, and reflections..."
                  className="flex min-h-20 w-full rounded-md border
                           bg-background px-3 py-2 text-sm
                           ring-offset-background
                           placeholder:text-muted-foreground
                           focus-visible:outline-none focus-visible:ring-2
                           focus-visible:ring-ring focus-visible:ring-offset-2
                           disabled:cursor-not-allowed disabled:opacity-50
                           resize-none border-border/50
                           focus:border-primary/50
                           leading-relaxed"
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  {content.length} characters
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <Button
                  onClick={resetForm}
                  disabled={isLoading}
                  className="h-10 px-4 py-2 flex-1 sm:flex-none
                           bg-primary hover:bg-primary/90
                           text-primary-foreground"
                >
                  <RefreshCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button
                  onClick={handleSaveEntry}
                  disabled={!isValid || isLoading}
                  className="h-10 px-4 py-2 flex-1 sm:flex-none
                           bg-primary hover:bg-primary/90
                           text-primary-foreground"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {isAnalyzing ? "Analyzing mood..." : "Saving..."}
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Entry
                    </>
                  )}
                </Button>

                <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span>AI will analyze your mood automatically</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6" />
      </main>
    </>
  );
}
