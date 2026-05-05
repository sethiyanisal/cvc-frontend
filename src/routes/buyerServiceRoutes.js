import Axios from "./axios";

const buyingPrice = (price) =>{
    return Axios.post("/Buyer/AddBuyingPrice", price);
};

const BuyerService = {
    buyingPrice
};

export default BuyerService;