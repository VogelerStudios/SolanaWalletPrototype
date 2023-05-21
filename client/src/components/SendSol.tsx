import TabPanel from "@mui/joy/TabPanel";
import Typography from "@mui/joy/Typography";

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
                Send
            </Typography>
        </TabPanel>
    );
};
export default SendSol;
