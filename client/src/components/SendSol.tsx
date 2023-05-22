import React, { useCallback, useState } from "react";
import Alert from "@mui/joy/Alert";
import TabPanel from "@mui/joy/TabPanel";
import Typography from "@mui/joy/Typography";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Divider from "@mui/joy/Divider";
import Button from "@mui/joy/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReportIcon from "@mui/icons-material/Report";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { LoadingOutlined } from "@ant-design/icons";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
    PublicKey,
    SystemProgram,
    Transaction,
    LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import axios from "axios";
export interface transactionInfo {
    transactionHash: string;
    explorerLink: string;
    from: string;
    to: string;
    amount: Number;
    slot: Number;
}

const SendSol: React.FC = () => {
    const [destinationWallet, setDestinationWallet] = useState("");
    const [amount, setAmount] = useState(1);
    const [message, setMessage] = useState("");
    const [transactionInformation, setTransactionInformation] =
        useState<transactionInfo>();
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [fetchingData, setFetchingData] = useState(false);

    const onClick = useCallback(async () => {
        setFetchingData(true);
        try {
            if (!publicKey) throw new WalletNotConnectedError();
            // 890880 lamports as of 2022-09-01
            const lamports = amount * LAMPORTS_PER_SOL;
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: new PublicKey(destinationWallet),
                    lamports,
                })
            );

            const {
                context: { slot: minContextSlot },
                value: { blockhash, lastValidBlockHeight },
            } = await connection.getLatestBlockhashAndContext();

            const signature = await sendTransaction(transaction, connection, {
                minContextSlot,
            });

            const sentTransaction = await connection.confirmTransaction({
                blockhash,
                lastValidBlockHeight,
                signature,
            });

            if (!sentTransaction.value.err) {
                setTransactionInformation({
                    transactionHash: signature,
                    explorerLink: `https://explorer.solana.com/tx/${signature}?cluster=testnet`,
                    from: publicKey.toBase58(),
                    to: destinationWallet,
                    amount: lamports,
                    slot: sentTransaction.context.slot,
                });
                setMessage("success");
            } else {
                setMessage("error");
            }
            setFetchingData(false);
            axios
                .post("http://localhost:5000/api/transactions/", {
                    transactionHash: signature,
                    explorerLink: `https://explorer.solana.com/tx/${signature}?cluster=testnet`,
                    from: publicKey.toBase58(),
                    to: destinationWallet,
                    amount,
                    slot: sentTransaction.context.slot,
                })
                .then((data) => {
                    console.log("Transaction created successfully: ", data);
                })
                .catch((e) => {
                    console.log("error: ", e);
                });
        } catch (error) {
            setMessage("error");
        }
    }, [publicKey, sendTransaction, connection, destinationWallet, amount]);

    return (
        <TabPanel value={0}>
            <Typography
                level="h2"
                component="div"
                fontSize="lg"
                mb={2}
                textColor="text.primary"
            >
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        onClick();
                    }}
                >
                    Send SOL to another wallet
                    <Input
                        required
                        placeholder="Destination wallet address"
                        variant="outlined"
                        color="info"
                        sx={{ width: "50%", marginTop: "2rem" }}
                        onChange={(event) => {
                            setDestinationWallet(event.target.value);
                        }}
                    />
                    <Input
                        placeholder="Amount"
                        startDecorator="SOL"
                        color="info"
                        endDecorator={
                            <React.Fragment>
                                <Divider orientation="vertical" />
                            </React.Fragment>
                        }
                        sx={{ width: "30%", marginTop: "1rem" }}
                        onChange={(event) => {
                            const number = parseFloat(event.target.value);
                            setAmount(number);
                        }}
                    />
                    <Button sx={{ marginTop: "1rem" }} type="submit" color="info">
                        Send
                    </Button>
                </form>
                {fetchingData && !message ? (
                    <LoadingOutlined style={{ fontSize: 32, marginTop: 24 }} spin />
                ) : null}
                {message === "success" ? (
                    <Alert
                        key="success"
                        sx={{ alignItems: "flex-start", marginTop: "1rem" }}
                        startDecorator={React.cloneElement(<CheckCircleIcon />, {
                            sx: { mt: "2px", mx: "4px" },
                            fontSize: "xl2",
                        })}
                        variant="soft"
                        color="success"
                        endDecorator={
                            <IconButton variant="soft" size="sm" color="success">
                                <CloseRoundedIcon
                                    onClick={() => {
                                        setMessage("");
                                    }}
                                />
                            </IconButton>
                        }
                    >
                        Success! See your transaction --{" "}
                        <a
                            href={transactionInformation?.explorerLink}
                            target="_blank"
                            rel="noreferrer"
                        >
                            here
                        </a>
                    </Alert>
                ) : null}
                {message === "error" ? (
                    <Alert
                        key="error"
                        sx={{ alignItems: "flex-start", marginTop: "1rem" }}
                        startDecorator={React.cloneElement(<ReportIcon />, {
                            sx: { mt: "2px", mx: "4px" },
                            fontSize: "xl2",
                        })}
                        variant="soft"
                        color="danger"
                        endDecorator={
                            <IconButton variant="soft" size="sm" color="danger">
                                <CloseRoundedIcon
                                    onClick={() => {
                                        setMessage("");
                                    }}
                                />
                            </IconButton>
                        }
                    >
                        There was an error processing your transaction. Please try again.
                    </Alert>
                ) : null}
            </Typography>
        </TabPanel>
    );
};
export default SendSol;
