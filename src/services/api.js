import axios from 'axios'

//base url: https://api.themoviedb.org/3/

//url: https://api.themoviedb.org/3/movie/now_playing?api_key=9546d84592c787ad3d889a10ba23333e


const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/'
})

export default api;