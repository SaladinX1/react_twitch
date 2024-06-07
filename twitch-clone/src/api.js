import axios from 'axios'

let api = axios.create({
    baseURL: 'https://api.twitch.tv',
    headers: {
        'Client-ID' : `${import.meta.env.VITE_CLIENT_ID}`,
        'Authorization' : `Bearer ${import.meta.env.VITE_TOKEN}`
    }
})


/* 

    CLIENT_ID = ftvkxl4udazlcniaa9hqirn570m7ks
    REDIRECT = 'http://localhost:5173/'

    LIEN AUTH = https://id.twitch.tv/oauth2/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT}&response_type=token

*/ 

export default api;