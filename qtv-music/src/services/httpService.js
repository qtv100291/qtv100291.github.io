import axios from 'axios';
import { toast } from "react-toastify";


axios.interceptors.response.use(null, error=>{
    const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    toast.error('Đã có lỗi xảy ra. Xin thử lại', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
  });
  }

  return Promise.reject(error);
})

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}


