import { createContext, useContext, ReactNode } from "react";
import { IUseLoading, useLoadingHook } from "./hook";

interface IProps {
    children: ReactNode;
}

const LoadingContext = createContext<IUseLoading | undefined>(undefined);

export const LoadingProvider = ({ children }: IProps) => {
    const { initLoading, endLoading, loading } = useLoadingHook();

    return (
        <LoadingContext.Provider
            value={{
                initLoading,
                endLoading,
                loading,
            }}
        >
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = (): IUseLoading => {
    const context = useContext(LoadingContext);

    if (!context) {
        throw new Error("useMenu must be used within a LoadingProvider");
    }

    return context;
};
