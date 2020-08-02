import http from './httpService';
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";


const apiEndpoint = apiUrl + '/login';
const tokenKey = "token";
const apiEndpointUser = apiUrl + '/users'


export async function login(user){
    const userData = {
        email : user.emailLogIn,
        password : user.passwordLogIn,
    }
    const { data : tokenUser  } = await http.post(apiEndpoint,userData);
    localStorage.setItem(tokenKey, tokenUser.accessToken);
}

export function getCurrentUser(){
    try {
        const jwtUser = localStorage.getItem(tokenKey);
        return jwtDecode(jwtUser);
    }
    catch (ex){
        return null
    }
}

export async function getCurrentUserName(userId){
    const {data : user} = await http.get(apiEndpointUser + `/${userId}`)
    return user.name
}

export default {
    login,
    getCurrentUser,
    getCurrentUserName
}


// const InfoItem = ({ textitem }) => {
//     return (
//       <div>
//         {textitem.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
//       </div>
//     );
// };