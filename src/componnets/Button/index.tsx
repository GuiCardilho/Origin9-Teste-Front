import { ReactNode } from "react";
import { ReactComponent as Loading } from "../../assets/loading.svg";
import clsx from "clsx";

export interface ButtonProps {
    asChild?: boolean;
    type?: "success" | "error";
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    children: ReactNode;
    className?: string;
}

export const Button = ({
    loading,
    disabled,
    type,
    onClick,
    children,
    asChild,
    className,
}: ButtonProps) => {
    return (
        <button
            disabled={loading || disabled}
            onClick={!asChild ? onClick : undefined}
            className={clsx(
                `flex items-center text-center justify-center flex-1 ${
                    className || ""
                } `,
                {
                    "bg-gray-500 py-2 px-3 rounded font-semibold text-white text-sans text-sm hover:bg-gray-800 transition-colors focus:ring-2 ring-white":
                        type == undefined,
                    "outline-none border border-solid text-white  bg-red-500 p-2 rounded-md flex items-center gap-3 text-xs focus:ring-2 ring-white hover:bg-red-800 transition-colors":
                        type == "error",
                    "outline-none border border-solid h-10 text-white  bg-green-500 p-2 rounded-md flex items-center gap-3 text-xs focus:ring-2 ring-white hover:bg-green-800 transition-colors":
                        type == "success",
                    "!bg-gray-300 shadow-sm !text-white !hover:bg-gray-300 !hover:text-white !cursor-not-allowed !focus:ring-0":
                        disabled == true,
                    "cursor-not-allowed focus:ring-0": loading,
                }
            )}
        >
            {loading ? <Loading /> : children}
        </button>
    );
};
