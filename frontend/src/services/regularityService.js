import axios from "axios";
import {set} from "../slices/regularitySlice";
import authHeader from "./auth-header";

const getAllRegularity = (dispatch) => {
    return axios.get(`/regularities`, { headers: authHeader() }).then(
        (response) => {
            dispatch(set(response.data));
            console.log(response.data);
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)

            dispatch(set([]));
        });
};

const regularityService = {
    getAllRegularity,
};

export default regularityService