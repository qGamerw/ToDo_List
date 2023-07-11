import axios from "axios";
import {set} from "../slices/prioritySlice";
import {API_URL} from "./API_URL";
import authHeader from "./auth-header";

const getAllPriority = (dispatch) => {
    return axios.get(`/priority`, { headers: authHeader() }).then(
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

const priorityService = {
    getAllPriority,
};

export default priorityService