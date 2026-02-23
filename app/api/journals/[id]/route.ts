import { connectDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import journals from "@/lib/models/JournalModel"

export async function GET(req : NextRequest){
    try{
        const id = req.nextUrl.pathname.split("/")[3];
        console.log("Entry Id to update : ", id);
        
        await connectDB();
        const entryDetails = await journals.findOne({ _id : id });
        return NextResponse.json(entryDetails, {status : 200});
    }catch(err){
        console.log(err);
        return NextResponse.json(err, {status : 500})
    }
}