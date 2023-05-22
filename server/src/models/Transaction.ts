import mongoose, { Document, Schema } from "mongoose";

export interface ITransaction extends Document {
  transactionHash: string;
  explorerLink: string;
  from: string;
  to: string;
  amount: number;
  slot: number;
  date: Date;
}

const TransactionSchema: Schema = new Schema({
  transactionHash: { type: String, required: true },
  explorerLink: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  amount: { type: Number, required: true },
  slot: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<ITransaction>("Transaction", TransactionSchema);
