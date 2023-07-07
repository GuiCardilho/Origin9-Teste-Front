import { ToastContainer } from "react-toastify";
import { DialogProvider } from "../hooks/dialog";
import { DialogModal } from "../componnets/Dialog";
import { LoadingProvider } from "../hooks/loading";
import { Spinner } from "../componnets/Spinner";

interface IProps {
    children: React.ReactNode;
}

export const AllContexts = ({ children }: IProps) => {
    return (
        <>
            <DialogProvider>
                <LoadingProvider>
                    <DialogModal />
                    <Spinner />
                    <ToastContainer />
                    {children}
                </LoadingProvider>
            </DialogProvider>
        </>
    );
};
