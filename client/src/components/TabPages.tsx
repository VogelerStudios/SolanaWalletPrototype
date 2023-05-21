import React, { useState } from "react";
import Box from "@mui/joy/Box";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import TransactionHistory from "./TransactionHistory";
import SendSol from "./SendSol";

const TabPages: React.FC = () => {
    const [index, setIndex] = useState(0);

    return (
        <Box sx={styles.container}>
            <Tabs
                aria-label="Pipeline"
                value={index}
                onChange={(event, value) => setIndex(value as number)}
                sx={{ "--Tabs-gap": "0px" }}
            >
                <TabList variant="plain" sx={styles.tabList}>
                    <Tab>Send SOL</Tab>
                    <Tab>Transaction History</Tab>
                </TabList>
                <Box sx={styles.tabContainer} />
                <Box sx={styles.tabBox}>
                    <SendSol />
                    <TransactionHistory />
                </Box>
            </Tabs>
        </Box>
    );
};

const styles = {
    container: {
        bgcolor: "background.body",
        width: "70%",
        height: "70%",
        minHeight: 400,
        m: -3,
        overflowX: "hidden",
        borderRadius: "md",
        boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1)",
    },
    tabList: {
        width: "100%",
        maxWidth: 400,
        mx: "auto",
        pt: 2,
        alignSelf: "flex-start",
        [`& .${tabClasses.root}`]: {
            bgcolor: "transparent",
            "&:hover": {
                bgcolor: "transparent",
            },
            [`&.${tabClasses.selected}`]: {
                color: "#5339cb",
                fontWeight: "lg",
                "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    zIndex: 1,
                    bottom: "-2px",
                    left: "var(--ListItem-paddingLeft)",
                    right: "var(--ListItem-paddingRight)",
                    height: "4px",
                    bgcolor: "#5339cb",
                },
            },
        },
    },
    tabBox: {
        background: "var(--bg)",
        boxShadow: "0 0 0 100vmax var(--bg)",
        clipPath: "inset(0 -100vmax)",
        px: 4,
        py: 2,
    },
    tabContainer: {
        "--bg": "#5339cb",
        height: "1px",
        background: "var(--bg)",
        boxShadow: "0 0 0 100vmax var(--bg)",
        clipPath: "inset(0 -100vmax)",
    },
};
export default TabPages;
