import mongoose, { Document } from "mongoose";

export interface IJobs extends Document {
  _id: mongoose.Types.ObjectId;
  compnay: string;
  position: string;
  status: string;
  jobType: string;
  jobLocation: string;
  createdBy: mongoose.Types.ObjectId;
}

export const JobSchema = new mongoose.Schema<IJobs>(
  {
    company: {
      type: String,
      required: [true, "Please provide company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "remote", "internship"],
      default: "full-time",
    },
    jobLocation: {
      type: String,
      default: "my city",
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export const Job = mongoose.model<IJobs>("Job", JobSchema);
