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


class Conga{
    constructor(height, width){
        this.height = height;
        this.width = width;
        // this.area = this.area.bind(this)
    }
    area(){
        console.log(this.height*this.width)
    }

    render(){
        console.log("diện tích là: " , this.area.bind(this))
    }
}