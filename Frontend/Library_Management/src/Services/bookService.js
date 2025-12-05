import axios from 'axios'

const base_url = "http://localhost:1234";

export const bookService = {

    getAllBooks : async() =>(await axios.get(`${base_url}/allBooks`)).data,

    add : async(record) =>(await axios.post(`${base_url}/add`,record)).data,

    update : async(id,record) =>(await axios.put(`${base_url}/update/${id}`,record)).data,

    deletebook : async(id) =>(await axios.delete(`${base_url}/delete/${id}`)).data

}
