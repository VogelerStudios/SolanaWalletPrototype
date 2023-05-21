import TabPanel from '@mui/joy/TabPanel';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import SearchRounded from '@mui/icons-material/SearchRounded';
// import { useContext } from 'react';
// import { GlobalContext } from '../context/GlobalState';

const TransactionHistory = () => {
    // const { transactions } = useContext(GlobalContext);

    return (
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
            />
        </TabPanel>
    );
};

export default TransactionHistory;
