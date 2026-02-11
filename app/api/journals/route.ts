import { connectDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import journals from "@/lib/models/JournalModel"
import { analyzeMood } from "@/lib/gemini";

export async function GET(req : NextRequest){
    try{
        await connectDB();
        const allEntries = await journals.find();
        return NextResponse.json(allEntries, {status : 200});
    }catch(err){
        console.log(err);
        return NextResponse.json(err, {status : 500})
    }
}

export async function POST(req:NextRequest){
    try{
        await connectDB();
        const { userId, title, content } = await req.json();

        const mood = await analyzeMood(content);

        console.log("Mood Analysis results : ", mood);

        const existingEntry = await journals.findOne({title});
        if(existingEntry){
            return NextResponse.json("Entry with same title exists", { status: 401 })
        }
        else{
            const newEntry = await journals.create({ userId, title, content, mood });
            return NextResponse.json(newEntry, {status : 201});
        }

    }catch(err){
        console.log(err);
        return NextResponse.json(err, { status: 500 })
    }
}

export async function DELETE(req:NextRequest){
    try{
        await connectDB();
        const { id } = await req.json();

        const deletedEntry = await journals.findByIdAndDelete({ _id: id });
        return NextResponse.json(deletedEntry, {status : 200});

    }catch(err){
        console.log(err);
        return NextResponse.json(err, { status: 500 })
    }
}