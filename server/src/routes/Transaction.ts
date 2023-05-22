import express from "express";
import * as TransactionController from "../controllers/Transaction";

const router = express.Router();

router.get("/:walletId", TransactionController.getTransactionsByWallet);
router.post("/", TransactionController.createTransaction);

export default router;
