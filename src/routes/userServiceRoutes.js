import Axios from "./axios";

const signUpUser = (user) => {
  return Axios.post("/signup", user);
};

const signInUser = (user) => {
  return Axios.post("/signin", user);
};

const getLocations = () => {
  return Axios.get("/getLocations");
};


const UserService = {
    signUpUser,
    signInUser,
    getLocations
  };
    
  export default UserService;