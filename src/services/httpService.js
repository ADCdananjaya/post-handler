import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const exprectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!exprectedError) {
    console.log(error);
    toast.error("An unexcepted error occured!");
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
