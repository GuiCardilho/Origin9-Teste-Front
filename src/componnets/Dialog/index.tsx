import { ReactNode, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button, ButtonProps } from "../Button";
import { useDialog } from "../../hooks/dialog";
import clsx from "clsx";

export interface IPropsDialogModal {
    loading?: boolean;
    modal?: {
        status: boolean;
        type?: "success" | "error";
        title?: {
            lefticon?: ReactNode;
            icon?: ReactNode;
            text: ReactNode;
        };
        description?: ReactNode;
        element?: ReactNode;
        onClose?: () => void;
        primarybutton?: {
            id: string;
            text: string;
            onClick: () => void;
            type?: ButtonProps["type"];
        };
        secondarybutton?: {
            id: string;
            text: string;
            onClick: () => void;
        };
    };
}

export const DialogModal = () => {
    const { infoModal } = useDialog();

    return infoModal.modal?.status ? (
        <>
            {infoModal.modal && (
                <Transition
                    appear
                    show={!!infoModal.modal?.status}
                    as={Fragment}
                >
                    <Dialog
                        as="div"
                        className="relative z-10"
                        onClose={() => {
                            if (infoModal.modal?.onClose) {
                                infoModal.modal.onClose();
                            }
                        }}
                        open={!!infoModal.modal?.status}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-md bg-white text-left align-middle transition-all flex flex-col shadow-xl">
                                        <div className="p-6 gap-1 w-full max-w-md transform overflow-hidden rounded-md bg-white text-left align-middle transition-all flex flex-col">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-medium leading-6 text-gray-900 mb-2"
                                            >
                                                <div className="flex justify-center items-center ">
                                                    <div
                                                        className={clsx(
                                                            "p-3 rounded-full ",
                                                            {
                                                                "bg-green-100 text-green-600":
                                                                    infoModal
                                                                        .modal
                                                                        .type ==
                                                                        "success" ||
                                                                    infoModal
                                                                        .modal
                                                                        .type ==
                                                                        undefined,
                                                            },
                                                            {
                                                                "bg-red-100 text-red-600":
                                                                    infoModal
                                                                        .modal
                                                                        .type ==
                                                                    "error",
                                                            }
                                                        )}
                                                    >
                                                        {
                                                            infoModal.modal
                                                                .title?.icon
                                                        }
                                                    </div>
                                                </div>

                                                <div className="flex gap-4 justify-center items-center">
                                                    {infoModal.modal.title
                                                        ?.lefticon && (
                                                        <div className="flex justify-center items-center p-2 bg-orange-100 text-orange-500 rounded-full">
                                                            {
                                                                infoModal.modal
                                                                    .title
                                                                    ?.lefticon
                                                            }
                                                        </div>
                                                    )}
                                                    <div
                                                        className={clsx(
                                                            `text-gray-900 flex justify-center items-center w-full pt-4 max-w-xs font-semibold`,
                                                            {
                                                                "text-center":
                                                                    infoModal
                                                                        .modal
                                                                        .title
                                                                        ?.icon,
                                                            },
                                                            {
                                                                "text-start":
                                                                    infoModal
                                                                        .modal
                                                                        .title
                                                                        ?.lefticon,
                                                            }
                                                        )}
                                                    >
                                                        {
                                                            infoModal.modal
                                                                .title?.text
                                                        }
                                                    </div>
                                                </div>
                                            </Dialog.Title>
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-medium leading-6 text-gray-900 mb-2"
                                            >
                                                {infoModal.modal
                                                    .description && (
                                                    <div className="flex gap-4 justify-center items-center">
                                                        <div className="text-gray-500 flex justify-center items-center text-center font-normal text-sm max-w-xs">
                                                            {
                                                                infoModal.modal
                                                                    .description
                                                            }
                                                        </div>
                                                    </div>
                                                )}
                                            </Dialog.Title>

                                            {infoModal.modal.element}

                                            {(infoModal.modal.secondarybutton ||
                                                infoModal.modal
                                                    .primarybutton) && (
                                                <div className="flex gap-4 h-10">
                                                    {infoModal.modal
                                                        .secondarybutton && (
                                                        <Button
                                                            onClick={
                                                                infoModal.modal
                                                                    .secondarybutton
                                                                    .onClick
                                                            }
                                                            loading={
                                                                infoModal.loading
                                                            }
                                                            type={"success"}
                                                            className="flex-1"
                                                        >
                                                            {
                                                                infoModal.modal
                                                                    .secondarybutton
                                                                    ?.text
                                                            }
                                                        </Button>
                                                    )}

                                                    {infoModal.modal
                                                        .primarybutton && (
                                                        <Button
                                                            onClick={
                                                                infoModal.modal
                                                                    .primarybutton
                                                                    .onClick
                                                            }
                                                            loading={
                                                                infoModal.loading
                                                            }
                                                            type={
                                                                infoModal.modal
                                                                    .primarybutton
                                                                    .type
                                                            }
                                                            className="flex-1"
                                                        >
                                                            {
                                                                infoModal.modal
                                                                    .primarybutton
                                                                    ?.text
                                                            }
                                                        </Button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            )}
        </>
    ) : (
        <></>
    );
};
