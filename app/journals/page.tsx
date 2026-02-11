"use client";
import { EmptyState } from "@/components/EmptyState";
import JournalCard from "@/components/JournalCard";
import { useEffect, useState } from "react";

interface Journal {
  _id: string;
  [key: string]: any;
}

export default function Journals() {
    const [journals, setJournals] = useState<Journal[]>([]);
    // const [deleteId, setDeleteId] = useState<string | null>(null);
    
  useEffect(() =>{
    fetchAllEntries();
  }, [])

  console.log(journals);
  

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

  return (
    <>
      <main className="container py-6">
        {journals.length > 0 ? (
          journals.map((journal, index) => (
            <div key={index} className="my-6">
              <JournalCard journal={journal} onDelete={() => removeEntry(journal._id)} />
            </div>
          ))
        ) : (
          <EmptyState />
        )}
      </main>
    </>
  );
}
