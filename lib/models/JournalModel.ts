import mongoose, { model, models, Schema } from "mongoose";

export interface IJournal{
    userId : mongoose.Schema.Types.ObjectId;
    title : string;
    content : string;
    mood : string;
}

const journalSchema = new Schema<IJournal>({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
        required: true,
        default : null
    },
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true,
        unique : true
    },
    mood : {
        type : String,
        required : true
    }
},
{
    timestamps : true
});

journalSchema.index({ userId: 1, title: 1 }, { unique: false });
export default models.journals || model<IJournal>('journals', journalSchema)