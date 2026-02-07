"use client";
import { EmptyState } from "@/components/EmptyState";
import JournalCard from "@/components/JournalCard";

export default function Home() {
  const handleNewEntry = () => {};

  return (
    <>
      <main className="container">
        <EmptyState onCreateNew={handleNewEntry} />
        <JournalCard />
      </main>
    </>
  );
}
