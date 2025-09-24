import axios from 'axios'
// import { toaster } from "../components/shared/toaster";

//RBAC Axions Instance
export const publicApi = axios.create({
  baseURL: 'http://10.1.1.109:8088/pointageBack',
})

// Response interceptor
publicApi.interceptors.response.use(
  (response) => {
    // For successful responses (2xx), pass through the response as-is
    return response
  },
  (error) => {
    let errorMessage = ''

    // For error responses, handle them based on the status code range
    if (error.response) {
      //  toaster.create({
      //        type: "error",
      //        title: "Erreur",
      //        description: "Une erreur est survenue, merci de réessayer.",
      //        meta: { closable: false },
      //      })
    }

    return Promise.reject({
      ...error,
      message: errorMessage,
    })
  }
)
