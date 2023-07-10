import axios from 'axios';

const API_URL = 'http://localhost:8000/';  // Asegúrate de cambiar esta URL a la de tu API


export function getListWithSearch (searchTerm) {
        return axios.get(`${API_URL}Abastecimiento_TbNclasificacionPlato`, {
            params: {
                search: searchTerm
            }
        });
}

export function getList() {
    return axios.get(`${API_URL}Abastecimiento_TbNclasificacionPlato/`);
}

export function getDetail(id) {
    return axios.get(`${API_URL}Abastecimiento_TbNclasificacionPlato/${id}/`);
}

export function create(data) {
    return axios.post(`${API_URL}Abastecimiento_TbNclasificacionPlato/`, data);
}

export function update(id, data) {
    return axios.put(`${API_URL}Abastecimiento_TbNclasificacionPlato/${id}/`, data);
}

export function partialUpdate(id, data) {
    return axios.patch(`${API_URL}Abastecimiento_TbNclasificacionPlato/${id}/`, data);
}

export function remove(id) {
    return axios.delete(`${API_URL}Abastecimiento_TbNclasificacionPlato/${id}/`);
}