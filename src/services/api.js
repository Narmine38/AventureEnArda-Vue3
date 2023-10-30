import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://goldfish-app-9xfta.ondigitalocean.app/', // URL de base de votre API Laravel
    withCredentials: true // Important pour envoyer et recevoir des cookies
});

export default instance;
