import http from './httpService';
import { apiUrl } from "../config.json";
import _ from 'lodash';

const apiEndpointProvince = apiUrl + '/province';
const apiEndpointDistrict = apiUrl + '/district';
const apiEndpointCommune = apiUrl + '/commune';

async function getProvince() {
    const { data : provinceList } = await http.get(apiEndpointProvince);
    return provinceList
}

async function getDistrict(idProvince) {
    const { data : districtList } = await http.get(apiEndpointDistrict + '/?idProvince=' + idProvince);
    return districtList
}

async function getCommune(idDistrict) {
    const { data : communeList } = await http.get(apiEndpointCommune + '/?idDistrict=' + idDistrict);
    return communeList 
}

export default {
    getProvince,
    getDistrict,
    getCommune
}

