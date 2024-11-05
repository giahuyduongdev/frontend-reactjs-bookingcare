import axios from "../axios";

const handleLoginApi = (userName, userPassword) => {
  return axios.post("/api/login", {email: userName, password: userPassword});
}

const getAllUsers = (inputId) =>{
  return axios.get(`/api/get-all-users?id=${inputId}`);
}


export {
  handleLoginApi,
  getAllUsers
}