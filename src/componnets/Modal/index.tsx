import { ReactNode, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "../Button";

interface IButtons {
    id: string;
    text: string;
    onClick: () => void;
    disabled?: boolean;
}

interface IProps {
    element?: ReactNode;
    title?: {
        lefticon: ReactNode;
        text: ReactNode;
    };
    isOpen?: boolean;
    onClose?: () => void;
    primarybutton?: IButtons;
    secondarybutton?: IButtons;
    loading?: boolean;
}

export const Modal = ({
    element,
    title,
    isOpen,
    onClose,
    primarybutton,
    secondarybutton,
    loading,
}: IProps) => {
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={() => {
                        if (onClose) {
                            onClose();
                        }
                    }}
                    open={isOpen}
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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white text-left align-middle transition-all flex flex-col shadow-xl">
                                    <div className="p-6 gap-4 w-full max-w-md transform overflow-hidden rounded-md bg-white text-left align-middle transition-all flex flex-col">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900 mb-2"
                                        >
                                            <div className="flex gap-4">
                                                <div className="flex justify-center items-center p-2 bg-gray-100 text-gray-500 rounded-full">
                                                    {title?.lefticon}
                                                </div>
                                                <div className="text-gray-900 flex justify-center items-center ">
                                                    {title?.text}
                                                </div>
                                            </div>
                                        </Dialog.Title>

                                        {element}
                                    </div>
                                    {(secondarybutton || primarybutton) && (
                                        <div className="flex justify-end gap-3  item-center mt-2 bg-gray-50 py-3 px-6">
                                            {secondarybutton && (
                                                <Button
                                                    onClick={
                                                        secondarybutton.onClick
                                                    }
                                                    loading={loading}
                                                    type={"error"}
                                                    className=""
                                                >
                                                    {secondarybutton?.text}
                                                </Button>
                                            )}
                                            {primarybutton && (
                                                <Button
                                                    onClick={
                                                        primarybutton.onClick
                                                    }
                                                    loading={loading}
                                                    type={"success"}
                                                    disabled={
                                                        primarybutton.disabled
                                                    }
                                                    className=""
                                                >
                                                    {primarybutton?.text}
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};
