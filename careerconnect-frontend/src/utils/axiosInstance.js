import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
})

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const refreshToken = localStorage.getItem("refreshToken")
        const response = await axios.post("http://localhost:5000/api/users/refresh-token", {
          refreshToken,
        })
        const newAccessToken = response.data.accessToken
        localStorage.setItem("token", newAccessToken)
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError)
        localStorage.removeItem("token")
        localStorage.removeItem("refreshToken")
        window.location.href = "/login"
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance