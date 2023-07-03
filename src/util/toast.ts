import { toast } from "react-toastify";

interface IProps {
    message: string;
    type?: "info" | `success` | `warning` | `error` | `default`;
}

export const sendToast = ({ message, type }: IProps) => {
    toast(message, {
        toastId: "unique-toast-id",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        type: `${type != undefined ? type : "error"}`,
    });
};
