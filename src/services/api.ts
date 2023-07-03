import axios from "axios";
import { sendToast } from "../util/toast";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_API,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        const err = error.response;
        console.log(err);

        if (err?.status === 400) {
            sendToast({
                message: err.data.message,
            });
        }

        if (err?.status === 404) {
            sendToast({
                message: "Ops, não encontramos o que você está procurando.",
            });
        }

        if (err?.status === 500) {
            sendToast({
                message: "Ops, ocorreu um erro interno no servidor.",
            });
        }

        return Promise.reject(error);
    }
);

export default api;
