import clsx from "clsx";
import { SelectHTMLAttributes } from "react";

interface SelectField {
    options: {
        value: string | number;
        text: string;
    }[];
    label?: string;
    select?: SelectHTMLAttributes<HTMLSelectElement>;
    className?: string;
}

export function Select(props: SelectField) {
    return (
        <>
            <div className={`flex-1 flex flex-col`}>
                {props.label && (
                    <label className="block pl-2 text-sm font-medium text-gray-700">
                        {props.label}
                    </label>
                )}
                <select
                    {...props?.select}
                    className={clsx(
                        `rounded-lg p-2  w-full h-12 border-gray-300  bg-white focus:ring-2 focus:ring-gray-300 focus:border-none focus:!bg-white focus:text-gray-400 disabled:!bg-gray-200 disabled:!ring-0 disabled:!border disabled:!border-gray-300 disabled:!text-gray-500  active:ring-0 active:border-0   flex items-center mt-1 px-3 border border-solid
                        text-gray-500 text-xs placeholder:text-gray-400 focus-within:border-0 focus-within:ring-2 ring-gray-500 transition ${
                            props.select?.className || ""
                        }`
                    )}
                >
                    <option value="" disabled>
                        Selecione uma opção
                    </option>
                    {props.options.map((e) => (
                        <option value={e.value} key={e.value}>
                            {e.text}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
}
