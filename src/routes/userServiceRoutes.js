import Axios from "./axios";

const signUpUser = (user) => {
  return Axios.post("/signup", user);
};

const UserService = {
    signUpUser
  };
    
  export default UserService;