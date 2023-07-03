import { ChangeEvent } from "react";
import { Input } from "../Input";
import { Select } from "../Select";

interface ISelectOptions {
    value: string | number;
    text: string;
}

interface IRow {
    title: string;
    name: string;
    placeholder?: string;
    type?: "text" | "password" | "email" | "date" | undefined | string;
    select?: {
        options: ISelectOptions[];
        className?: string;
    };
    value?: string | number;
    mask?: string;
}

interface IProps {
    rows: IRow[];
    onChange: (
        e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
    ) => void;
    className?: string;
    value?: {
        [key: string]: string | undefined;
    };
}

export const FormModal = ({ rows, className, onChange, value }: IProps) => {
    return (
        <>
            {rows.map((element) => (
                <div
                    key={element.name}
                    className={`flex flex-col gap-4 ${className}`}
                >
                    {element.select ? (
                        <Select
                            options={element.select.options}
                            label={element.title}
                            select={{
                                name: element.name,
                                className: element.select.className,
                                value: value ? value[element.name] : "",
                                onChange: (e) => {
                                    if (onChange) onChange(e);
                                },
                            }}
                        />
                    ) : (
                        <Input
                            id={element.name}
                            label={element.title}
                            input={{
                                name: element.name,
                                value: value ? value[element.name] : "",
                                placeholder: element.placeholder,
                                onChange: onChange,
                            }}
                            type={element.type}
                            mask={element.mask}
                        />
                    )}
                </div>
            ))}
        </>
    );
};
