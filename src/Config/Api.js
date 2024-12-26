import axios from "axios"


// export const API_BASE_URL = "http://localhost:8080"
export const API_BASE_URL = "https://twitter-backend-production-a650.up.railway.app"


// let jwt = localStorage.getItem("jwt");

// export const api = axios.create({
//     baseURL:API_BASE_URL,
//     headers:{
//         "Authorization":`Bearer ${jwt}`,
//         "Content-Type":"application/json"

//     }
// })







// Modify the axios interceptor to always fetch the JWT from localStorage when making a request.
//  This way, if a user logs out and logs in with a
//   different account, the most recent JWT will always be used.



export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

    // Add an interceptor to include JWT from localStorage in every request
    api.interceptors.request.use(
    (config) => {
        const jwt = localStorage.getItem("jwt"); // Fetch the JWT token dynamically before every request
        if (jwt) {
            config.headers["Authorization"] = `Bearer ${jwt}`; // Set the Authorization header with the current token in api(axios object)
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);





