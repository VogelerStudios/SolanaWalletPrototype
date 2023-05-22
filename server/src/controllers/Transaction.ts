import { Request, Response } from "express";
import Transaction from "../models/Transaction";

// Create a new transaction
export const createTransaction = async (req: Request, res: Response) => {
  const transaction = new Transaction({
    transactionHash: req.body.transactionHash,
    explorerLink: req.body.explorerLink,
    from: req.body.from,
    to: req.body.to,
    amount: req.body.amount,
    slot: req.body.slot,
    date: req.body.date || Date.now(),
  });
  try {
    const savedTransaction = await transaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Get transactions for a given wallet
export const getTransactionsByWallet = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find({
      from: req.params.walletId,
    });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
