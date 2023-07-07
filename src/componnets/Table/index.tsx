import { clsx } from "clsx";

export interface IRows {
    [key: string]: string;
}

export interface IColumns {
    [key: string]: string;
}

interface IProps {
    rows: IRows[];
    columns: IColumns;
    options?: {
        onClick: (id: string) => void;
        icon: React.ReactNode;
    }[];
}

export const Table = ({ rows, columns, options }: IProps) => {
    return (
        <div className="border border-gray-300 rounded-lg shadow-sm shadow-slate-100 transition-all">
            <table className="table-auto w-full h-full ">
                <thead>
                    <tr className="border-b border-gray-300 bg-gray-100">
                        {Object.entries(columns).map(([key, value]) => (
                            <th
                                key={key}
                                className="p-4 text-start text-gray-700 font-bold "
                            >
                                {value}
                            </th>
                        ))}
                        {options && (
                            <th className="p-4 text-start text-gray-700 font-bold ">
                                Ações
                            </th>
                        )}
                    </tr>
                </thead>

                <tbody>
                    {rows.length == 0 ? (
                        <>
                            <tr>
                                <td
                                    colSpan={Object.keys(columns).length}
                                    className="p-4 text-center text-gray-400 font-bold"
                                >
                                    <h1>Não há dados para serem exibidos</h1>
                                </td>
                            </tr>
                        </>
                    ) : (
                        <>
                            {rows.map((row, index) => (
                                <tr key={index}>
                                    {Object.keys(columns).map((key, index) => (
                                        <td
                                            key={key}
                                            className={clsx(
                                                "p-4 text-gray-500 border-b border-gray-300",
                                                {
                                                    "font-semibold !text-gray-600":
                                                        index == 0,
                                                }
                                            )}
                                        >
                                            <>
                                                {(key == "status" &&
                                                    row[key] == "Ativo") ||
                                                row[key] == "Inativo" ? (
                                                    <div className="flex w-full h-full items-center">
                                                        <p
                                                            className={clsx(
                                                                "rounded-full font-semibold",
                                                                {
                                                                    "px-4 py-5 bg-green-200 text-green-600":
                                                                        row[
                                                                            key
                                                                        ] ==
                                                                        "Ativo",
                                                                    "px-2 py-5 bg-red-200 text-red-600":
                                                                        row[
                                                                            key
                                                                        ] ==
                                                                        "Inativo",
                                                                }
                                                            )}
                                                        >
                                                            {row[key]}
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <>{row[key]}</>
                                                )}
                                            </>
                                        </td>
                                    ))}

                                    {options?.length && (
                                        <td className="p-4 text-gray-500 border-b border-gray-300">
                                            <div className="flex items-center gap-4">
                                                {options.map((item, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() =>
                                                            item.onClick(
                                                                row["_id"]
                                                            )
                                                        }
                                                        className="border border-gray-300 rounded-lg p-3 transition-all hover:bg-gray-100"
                                                    >
                                                        {item.icon}
                                                    </button>
                                                ))}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </>
                    )}
                </tbody>
            </table>
        </div>
    );
};
