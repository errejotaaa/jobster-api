import { config } from "dotenv";
import { connectDB } from "./db/connect";
import { Job } from "./models/Job";
import data from "./MOCK_DATA.json";

config();

const pupulate = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Job.create(data);
    console.log("success!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

pupulate();
