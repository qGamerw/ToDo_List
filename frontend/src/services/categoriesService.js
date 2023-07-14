import axios from "axios";
import {set, setName} from "../slices/categoriesSlice";
import authHeader from "./auth-header";

const getCategories = (dispatch) => {
    return axios.get('/categories/all', {headers: authHeader()}).then(
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

const createCategory = (category, dispatch) => {
    console.log(category);

    return axios.post('/categories', category, {headers: authHeader()}).then(
        (response) => {
            getCategories(dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};

const getCategoryById = (id, dispatch) => {
    return axios.get('/categories/' + id, {headers: authHeader()}).then(
        (response) => {
            dispatch(setName(response.data));
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};

const deleteCategory = (id, dispatch) => {
    return axios.delete('/categories/' + id, {headers: authHeader()}).then(
        (response) => {
            getCategories(dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};

const categoriesService = {
    getCategories,
    createCategory,
    getCategoryById,
    deleteCategory,
};

export default categoriesService