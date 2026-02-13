import { NextResponse } from "next/server";
import { summarizeEntry } from "@/lib/gemini";
import journals from "@/lib/models/JournalModel";

export async function PUT(req: Request) {
  const res = await req.json();
  
  
  const id = await res._id;
  const content = await res.content;

  console.log("Content to be summarized : ",content);

  try {
    const summary = await summarizeEntry(content);
    const exisingEntry = await journals.findById({ _id: id });
    exisingEntry.summary = summary;
    await exisingEntry.save();

    return NextResponse.json({ exisingEntry }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Failed to generate summary" },
      { status: 500 },
    );
  }
}
