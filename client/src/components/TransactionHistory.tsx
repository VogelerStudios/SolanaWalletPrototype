import React, { Fragment, useState, useEffect } from "react";
import TabPanel from "@mui/joy/TabPanel";
import Typography from "@mui/joy/Typography";
import Input from "@mui/joy/Input";
import SearchRounded from "@mui/icons-material/SearchRounded";
import Table from "@mui/joy/Table";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Sheet from "@mui/joy/Sheet";
import axios from "axios";
import { useWallet } from "@solana/wallet-adapter-react";
export interface transactionInfo {
    transactionHash: string;
    explorerLink: string;
    to: string;
    amount: Number;
    slot: Number;
}

const TransactionHistory = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [transactionModal, setTransactionModal] = useState<transactionInfo>();
    const [rows, setRows] = useState<transactionInfo[]>([]);
    const { publicKey } = useWallet();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/transactions/${publicKey}`)
            .then((transactions: { data: [transactionInfo] }) => {
                setRows(transactions.data);
            })
            .catch((err: any) => console.log(err));
    }, [publicKey]);

    return (
        <Fragment>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={() => setOpen(false)}
                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        borderRadius: "md",
                        p: 3,
                        boxShadow: "lg",
                    }}
                >
                    <ModalClose
                        variant="outlined"
                        sx={{
                            top: "calc(-1/4 * var(--IconButton-size))",
                            right: "calc(-1/4 * var(--IconButton-size))",
                            boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
                            borderRadius: "50%",
                            bgcolor: "background.body",
                        }}
                    />
                    <Typography
                        component="h2"
                        id="modal-title"
                        level="h4"
                        textColor="inherit"
                        fontWeight="lg"
                        mb={1}
                    >
                        Transaction Information
                    </Typography>
                    <Typography id="modal-desc" textColor="text.tertiary">
                        <p> Transaction: {transactionModal?.transactionHash}</p>
                        <p>
                            {" "}
                            Solscan:{" "}
                            <a
                                href={transactionModal?.explorerLink}
                                target="_blank"
                                rel="noreferrer"
                            >
                                See transaction on the blockchain
                            </a>
                        </p>
                        <p> Wallet Destination: {transactionModal?.to}</p>
                        <p> Amount: {transactionModal?.amount.toString()} SOL</p>
                        <p>Slot: {transactionModal?.slot.toString()}</p>
                    </Typography>
                </Sheet>
            </Modal>

            <TabPanel value={1}>
                <Typography
                    level="h2"
                    component="div"
                    fontSize="lg"
                    mb={2}
                    textColor="text.primary"
                >
                    Transaction History
                </Typography>
                <Input
                    autoFocus
                    color="info"
                    placeholder="Search for transaction"
                    startDecorator={<SearchRounded />}
                    onChange={(event) => {
                        const searchValue = event.target.value;
                        axios
                            .get(`http://localhost:5000/api/transactions/${publicKey}`)
                            .then((transactions: { data: [transactionInfo] }) => {
                                const filteredRows = transactions.data.filter((row) => {
                                    return row.transactionHash.includes(searchValue);
                                });
                                setRows(filteredRows);
                            });
                    }}
                />
                <Table hoverRow>
                    <thead>
                        <tr>
                            <th>Transaction</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr
                                key={row.transactionHash}
                                onClick={() => {
                                    setOpen(true);
                                    setTransactionModal(row);
                                }}
                            >
                                <td>{row.transactionHash}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </TabPanel>
        </Fragment>
    );
};

export default TransactionHistory;
