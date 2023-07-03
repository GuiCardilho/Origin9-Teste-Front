import { useState } from 'react';
import { IPropsDialogModal } from '../../componnets/Dialog';

export interface IUseDialog {
    openDialog: () => void;
    closeDialog: () => void;
    handleDialog: () => void;
    infoModal: IPropsDialogModal;
    setInfoModal: React.Dispatch<React.SetStateAction<IPropsDialogModal>>;
}

export const useDialogHook = () => {
    const [infoModal, setInfoModal] = useState<IPropsDialogModal>({});

    const openDialog = () => {
        setInfoModal((oldvalue) => ({
            ...oldvalue,
            modal: { ...oldvalue.modal, status: true },
        }));
    };

    const closeDialog = () => {
        setInfoModal((oldvalue) => ({
            ...oldvalue,
            modal: { ...oldvalue.modal, status: false },
        }));
        setInfoModal({});
    };

    const handleDialog = () => {
        setInfoModal((oldvalue) => ({
            ...oldvalue,
            status: !oldvalue.modal?.status,
        }));
    };

    return {
        openDialog,
        closeDialog,
        handleDialog,
        infoModal,
        setInfoModal,
    };
};
