import axios from 'axios';


export const Api = axios.create({
    baseURL: 'https://95d6-179-191-215-191.ngrok-free.app', //Link da API deverá ser alterado de acordo com o deploy do servidor 
    headers: {
        'Content-Type': 'application/json'
    },
});


