import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000', // URL de base de votre API Laravel
    withCredentials: true // Important pour envoyer et recevoir des cookies
});

export default instance;
