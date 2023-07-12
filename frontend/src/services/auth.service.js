import axios from "axios";

const API_URL_CART = "/api/auth/"
const register = (registration) => {

    return axios.post(API_URL_CART + "signup", registration);
};

const login = (login) => {
    const {username, password} = login;

    return axios
        .post(API_URL_CART + "signin", {
            username,
            password,
        })
        .then((response) => {
            console.log(response)
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    console.log("logout")
    localStorage.removeItem("user");
};

const authService = {
    register,
    login,
    logout,
};

export default authService;