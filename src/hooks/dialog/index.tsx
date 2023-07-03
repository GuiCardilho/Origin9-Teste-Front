import { createContext, useContext, ReactNode } from 'react';
import { IUseDialog, useDialogHook } from './hook';

interface IProps {
    children: ReactNode;
}

const DialogContext = createContext<IUseDialog | undefined>(undefined);

export const DialogProvider = ({ children }: IProps) => {
    const { closeDialog, openDialog, handleDialog, setInfoModal, infoModal } =
        useDialogHook();

    return (
        <DialogContext.Provider
            value={{
                closeDialog,
                openDialog,
                handleDialog,
                setInfoModal,
                infoModal,
            }}
        >
            {children}
        </DialogContext.Provider>
    );
};

export const useDialog = (): IUseDialog => {
    const context = useContext(DialogContext);

    if (!context) {
        throw new Error('useMenu must be used within a DialogProvider');
    }

    return context;
};
