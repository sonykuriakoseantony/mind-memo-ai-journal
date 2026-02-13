"use client";
import { EmptyState } from "@/components/EmptyState";
import JournalCard from "@/components/JournalCard";
import { useEffect, useState } from "react";

export default function Journals() {
    const [journals, setJournals] = useState([])
    const [generatingSummaryId, setGeneratingSummaryId] = useState<string | null>(null);
    
  useEffect(() =>{
    fetchAllEntries();
  }, [])


  const fetchAllEntries = async () => {
    try{
      const res = await fetch('/api/journals')
      if(res.status == 200){
        setJournals(await res.json());
      }
      else{
        console.log("No journals available");
      }
    }catch(err){
      console.log(err);
    }
  };

  const removeEntry = async (id : string) => {
    try{
        const res = await fetch('/api/journals',{
          method : 'DELETE',
          body : JSON.stringify({id})
        })
        if(res.ok){
          fetchAllEntries();
        }
    }catch(err){
      console.log(err);
      console.log("Error removing entry!");
      
    }
  }

  const handleGenerateSummary = async (entry : any) => {
    setGeneratingSummaryId(entry._id);
    try{
      const res = await fetch('/api/ai', {
        method : 'PUT',
        body : JSON.stringify(entry)
      })
      if(res.ok){
        console.log("Summary generated successfully!");
        setGeneratingSummaryId(null);
        fetchAllEntries();
      }
    }catch(err){
      console.log(err);
      console.log("Error generating summary!");
    }
  }

  const updateEntry = async (id : string, updatedData : any) => {
    try{
        const res = await fetch('/api/journals',{
          method : 'PUT',
          body : JSON.stringify({id, ...updatedData})
        })
        if(res.ok){
          fetchAllEntries();
        }
    }catch(err){
      console.log(err);
      console.log("Error updating entry!");
    }
  }

  return (
    <>
      <main className="container py-6">
        {journals.length > 0 ? (
          journals.map((journal : any, index : number) => (
            <div key={index} className="my-6">
              <JournalCard journal={journal} onDelete={() => removeEntry(journal._id)} onGenerateSummary={handleGenerateSummary} onEdit={(id) => updateEntry(id, journal)} isGeneratingSummary={generatingSummaryId === journal.id}/>
            </div>
          ))
        ) : (
          <EmptyState />
        )}
      </main>
    </>
  );
}
