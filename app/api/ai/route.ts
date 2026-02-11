import { NextResponse } from "next/server"
import { summarizeEntry } from "@/lib/gemini"

export async function POST(req: Request) {
  const { content } = await req.json()
  const summary = await summarizeEntry(content)
  return NextResponse.json({ summary })
}
