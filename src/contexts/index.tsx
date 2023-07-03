import { ToastContainer } from "react-toastify";
import { DialogProvider } from "../hooks/dialog";
import { DialogModal } from "../componnets/Dialog";

interface IProps {
    children: React.ReactNode;
}

export const AllContexts = ({ children }: IProps) => {
    return (
        <>
            <DialogProvider>
                <DialogModal />
                <ToastContainer />
                {children}
            </DialogProvider>
        </>
    );
};
