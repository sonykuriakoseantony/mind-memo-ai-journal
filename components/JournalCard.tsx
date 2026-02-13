"use client";

import React, { useState } from "react";
import Button from "./ui/button";
import { MoodBadge } from "./MoodBadge";
import {
  ChevronDown,
  ChevronUp,
  Pencil,
  Sparkle,
  Sparkles,
  Trash2,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

type JournalCardProps = {
  journal: any;
  onDelete: (id: string) => void;
  onGenerateSummary: (entry: any) => void;
  onEdit: (entry: any) => void;
  isGeneratingSummary: boolean;
};

export default function JournalCard({
  journal,
  onDelete,
  onGenerateSummary,
  onEdit,
  isGeneratingSummary,
}: JournalCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentPreview = journal.content.slice(0, 200);
  const hasMore = journal.content.length > 200;

  return (
    <div className="container">
      <div className="group rounded-lg border border-border/50 bg-card text-card-foreground shadow-sm hover:shadow-card transition-all duration-300 animate-slide-up">
        <div className="flex flex-col space-y-1.5 p-6 pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-xl font-semibold text-foreground truncate">
                {journal.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                February 6, 2026 at 10:13 PM
              </p>
            </div>

            <MoodBadge
              sentiment={journal.mood}
              emoji={journal.emoji}
            ></MoodBadge>
          </div>
        </div>

        <div className="p-6 pt-0">
          <div className="prose prose-sm max-w-none text-foreground/80">
            <p className="whitespace-pre-wrap leading-relaxed">
              {isExpanded ? journal.content : contentPreview}
              {hasMore && !isExpanded && "..."}
            </p>
          </div>

          {hasMore && (
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-muted-foreground hover:text-accent-foreground p-0 hover:bg-accent h-9 rounded-md px-3"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-1" /> Show less
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-1" /> Read more
                </>
              )}
            </Button>
          )}

          {journal.summary && journal.summary.length > 0 && (
            <div className="mt-4 p-4 rounded-lg bg-secondary/50 border border-border/50">
              <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                AI Summary
              </h4>
              {/* <ReactMarkdown>{journal.summary}</ReactMarkdown> */}
              <ul className="space-y-1.5">
                {journal.summary.map((item: string, index: number) => (
                  <li
                    key={index}
                    className="text-sm text-foreground/80 flex items-start gap-2"
                  >
                    <span className="text-accent mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div
            className="mt-4 pt-4 flex items-center gap-2
               border-t border-border/50"
          >
            <Button
              className="h-9 rounded-md px-3 text-muted-foreground hover:bg-accent/80 hover:text-white"
              onClick={() => onEdit(journal)}
            >
              <Pencil className="w-4 h-4 mr-1.5" /> Edit
            </Button>
            <Button
              className="h-9 rounded-md px-3 text-muted-foreground hover:bg-accent/80 hover:text-white"
              onClick={() => onGenerateSummary(journal)}
              disabled={isGeneratingSummary}
            >
              <Sparkles
                className={`w-4 h-4 mr-1.5 ${isGeneratingSummary && "animate-pulse"}`}
              />
              {journal.summary ? "Regenerate Summary" : "Generate Summary"}
            </Button>

            <Button
              onClick={() => onDelete(journal._id)}
              className="h-9 rounded-md px-3 text-muted-foreground hover:bg-accent/80 hover:text-white ml-auto"
            >
              <Trash2 className="w-4 h-4 mr-1.5" /> Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
