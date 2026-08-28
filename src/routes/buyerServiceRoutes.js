import Axios from "./axios";

const buyingPrice = (price) =>{
    return Axios.post("/Buyer/AddBuyingPrice", price);
};

const getBuyingPrices = () => {
    return Axios.get("/Buyer/GetBuyingPrices");
}   

const updatePrice = (id, price) =>{
    return Axios.put("/Buyer/UpdatePrice/" + id, price);
} 

const BuyerService = {
    buyingPrice,
    getBuyingPrices,
    updatePrice
};

export default BuyerService;