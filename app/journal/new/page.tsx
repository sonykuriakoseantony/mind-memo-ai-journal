import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import EntryForm from "@/components/JournalForm";

export const metadata = {
  title: "New Entry - MindMemo",
  description: "Create a new journal entry",
};

export default function NewEntryPage() {
  return (
    <main className="min-h-screen gradient-warm">
      {/* Header */}
      <div className="border-b border-border/50 bg-card">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link
            href="/journals"
            className="inline-flex items-center gap-2 mb-4
                       text-muted-foreground hover:text-foreground
                       font-medium transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Journal
          </Link>

          <h1 className="font-display text-3xl font-semibold text-foreground">
            Create New Entry
          </h1>

          <p className="mt-2 text-muted-foreground">
            Express yourself. Our AI will analyze your thoughts and emotions.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto">
        <EntryForm />
      </div>
    </main>
  );
}
