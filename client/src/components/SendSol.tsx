import React from "react";
import TabPanel from "@mui/joy/TabPanel";
import Typography from "@mui/joy/Typography";
import Input from "@mui/joy/Input";
import Divider from "@mui/joy/Divider";
import Button from '@mui/joy/Button';

const SendSol = () => {
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
                    }}
                >
                    Send SOL to another wallet
                    <Input
                        placeholder="Destination wallet address"
                        variant="outlined"
                        color="info"
                        sx={{ width: "50%", marginTop: "2rem" }}
                    />
                    <Input
                        placeholder="Amount"
                        startDecorator="SOL"
                        type="number"
                        color="info"
                        endDecorator={
                            <React.Fragment>
                                <Divider orientation="vertical" />
                            </React.Fragment>
                        }
                        sx={{ width: "30%", marginTop: "1rem" }}
                    />
                    <Button sx={{ marginTop: "1rem" }} type="submit" color="info">Send</Button>
                </form>
            </Typography>
        </TabPanel>
    );
};
export default SendSol;
