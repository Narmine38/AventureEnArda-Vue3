import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://seashell-app-lb965.ondigitalocean.app', // URL de base de votre API Laravel
    withCredentials: true // Important pour envoyer et recevoir des cookies
});

export default instance;
