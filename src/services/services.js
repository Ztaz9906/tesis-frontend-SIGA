import axios from 'axios';

const API_URL = 'http://localhost:8000/';  // Asegúrate de cambiar esta URL a la de tu API


export function getListWithSearch (searchTerm,path) {
        return axios.get(`${API_URL}${path}/`, {
            params: {
                search: searchTerm
            }
        });
}

export function getList(path) {
    return axios.get(`${API_URL}${path}/`);
}

export function getDetail(id,path) {
    return axios.get(`${API_URL}${path}/${id}/`);
}

export function create(data,path) {
    return axios.post(`${API_URL}${path}/`, data);
}

export function update(id, data,path) {
    return axios.put(`${API_URL}${path}/${id}/`, data);
}

export function partialUpdate(id, data,path) {
    return axios.patch(`${API_URL}${path}/${id}/`, data);
}

export function remove(id,path) {
    return axios.delete(`${API_URL}${path}/${id}/`);
}