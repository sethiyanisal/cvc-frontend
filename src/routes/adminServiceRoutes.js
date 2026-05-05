import Axios from "./axios";

const addPrice = (price) =>{
  return Axios.post("/Admin/AddPrice", price);
};

const getAdminPrices = () => {
  return Axios.get("/Admin/GetPrices");
}

const updatePrice = (id, price) =>{
  return Axios.put("/Admin/UpdatePrice/" + id, price);
}

const AdminService = {
    addPrice,
    getAdminPrices,
    updatePrice
  };

export default AdminService;
