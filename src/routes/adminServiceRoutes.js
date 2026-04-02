import Axios from "./axios";

const addPrice = (price) =>{
  return Axios.post("/Admin/AddPrice", price);
};

const getAdminPrices = () => {
  return Axios.get("/Admin/GetPrices");
}

const AdminService = {
    addPrice,
    getAdminPrices
  };

export default AdminService;
