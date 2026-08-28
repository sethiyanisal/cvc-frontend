import Axios from "./axios";

const addPrice = (price) =>{
  return Axios.post("/Planter/AddPrice", price);
};

const getPrice = (id) =>{
  return Axios.get("/Planter/GetTodayPrice/" + id);
};

const updatePrice = (id, price) =>{
  return Axios.put("/Planter/UpdatePrice/" + id, price);
}

const getAllPrices = () => {
  return Axios.get("/Planter/GetAllPrices");
}

const PlanterService = {
    addPrice,
    getPrice,
    updatePrice,
    getAllPrices
  };
    
export default PlanterService;