import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://lionfish-app-7i8g6.ondigitalocean.app', // URL de base de votre API Laravel
    withCredentials: true // Important pour envoyer et recevoir des cookies
});

export default instance;
