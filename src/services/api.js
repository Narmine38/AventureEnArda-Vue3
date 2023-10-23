import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://aventure-en-adra-api-1a54c40aadc3.herokuapp.com', // URL de base de votre API Laravel
    withCredentials: true // Important pour envoyer et recevoir des cookies
});

export default instance;
