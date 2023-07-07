import { useState } from "react";

export interface IUseLoading {
    initLoading: () => void;
    endLoading: () => void;
    loading: boolean;
}

export const useLoadingHook = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const initLoading = () => {
        setLoading(true);
    };

    const endLoading = () => {
        setLoading(false);
    };

    return {
        initLoading,
        endLoading,
        loading,
    };
};
