import axios from 'axios'

const api = axios.create({
    baseURL: (process.env.NODE_ENV !== 'production' ? 'http://localhost:2000' : 'https://bug-trackerapp.herokuapp.com')
})

export default api