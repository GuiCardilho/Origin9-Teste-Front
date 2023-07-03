import InputMask from "react-input-mask";
import clsx from "clsx";

interface IButton {
    type?: HTMLButtonElement["type"];
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    className?: string;
    text: string;
}

export interface InputProps {
    className?: string;
    label?: string;
    type?: string;
    name?: string;
    input?: React.InputHTMLAttributes<HTMLInputElement>;
    mask?: string;
    id: string;
    button?: IButton;
    secondaryButton?: IButton;
}

export const Input = (props: InputProps) => {
    return (
        <div className="flex flex-1 flex-col gap-1">
            {props.label && (
                <label
                    htmlFor={props.id}
                    className="block pl-2 text-lg font-medium text-gray-700"
                >
                    {props.label}
                </label>
            )}

            <div className="flex flex-1 gap-4">
                <label
                    className={clsx(
                        `gap-3 p-3 border flex-1 border-solid rounded-lg bg-white text-gray-100 placeholder:text-gray-400 focus-within:border-0 focus-within:ring-2 ring-gray-500 transition ${props.className}`
                    )}
                >
                    {props.mask ? (
                        <InputMask
                            {...props.input}
                            data-testid={props.id}
                            id={props.id}
                            className="bg-transparent flex-1 text-gray-700 text-xs placeholder:text-gray-500 outline-none"
                            mask={props.mask}
                            maskChar={null}
                        />
                    ) : (
                        <input
                            {...props.input}
                            data-testid={props.id}
                            id={props.id}
                            type={props.type || "text"}
                            className="bg-transparent flex-1 text-gray-700 text-md placeholder:text-gray-500 outline-none !w-full !p-0"
                        />
                    )}
                </label>

                {props.button && (
                    <button
                        type={props.button?.type}
                        onClick={(e) => props.button?.onClick(e)}
                        className={props.button?.className}
                    >
                        {props.button?.text}
                    </button>
                )}

                {props.secondaryButton && (
                    <button
                        type={props.secondaryButton?.type}
                        onClick={(e) => props.secondaryButton?.onClick(e)}
                        className={props.secondaryButton?.className}
                    >
                        {props.secondaryButton?.text}
                    </button>
                )}
            </div>
        </div>
    );
};
