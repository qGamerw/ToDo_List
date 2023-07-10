import axios from "axios";
import {set} from "../slices/categoriesSlice";
import {API_URL} from "./API_URL";
import authHeader from "./auth-header";

const API_URL_CATEGORY = `${API_URL}/category`;

const getCategories = (dispatch) => {
    return axios.get(API_URL_CATEGORY, {headers: authHeader()}).then(
        (response) => {
            dispatch(set(response.data));
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)

            dispatch(set([]));
        });
};
//
// const createProduct = (product, dispatch) => {
//
//     return axios.post(API_URL_PRODUCT, product, {headers: authHeader()}).then(
//         (response) => {
//             getProducts(dispatch)
//         },
//         (error) => {
//             const _content = (error.response && error.response.data) ||
//                 error.message ||
//                 error.toString();
//
//             console.error(_content)
//         });
// };
//
// const updateProduct = (product, dispatch) => {
//     return axios.put(API_URL_PRODUCT, product, {headers: authHeader()}).then(
//         (response) => {
//             getProducts(dispatch)
//         },
//         (error) => {
//             const _content = (error.response && error.response.data) ||
//                 error.message ||
//                 error.toString();
//
//             console.error(_content)
//         });
// };
//
// const deleteProduct = (id, dispatch) => {
//     return axios.delete(API_URL_PRODUCT + `/${id}`, {headers: authHeader()}).then(
//         (response) => {
//             getProducts(dispatch)
//         },
//         (error) => {
//             const _content = (error.response && error.response.data) ||
//                 error.message ||
//                 error.toString();
//
//             console.error(_content)
//         });
// };

const productService = {
    getCategories,
};

export default productService