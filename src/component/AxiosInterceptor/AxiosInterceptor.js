import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  // other configurations
  headers:{
    "AuthToken":localStorage.getItem("AuthToken"),
  }
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status !== 200) {
      console.log('error response')
      
    }
    return Promise.reject(error)
  },
)

export default axiosInstance