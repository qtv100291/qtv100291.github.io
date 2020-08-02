import http from './httpService';
import { apiUrl } from "../config.json";


const apiEndpoint = apiUrl + '/register';

export default function registerNewUser(user){
    const data = {
        email : user.emailRegister,
        phone : user.phoneRegister,
        password : user.passwordRegister,
        name : user.nameRegister
    }
    return http.post(apiEndpoint,data)
}