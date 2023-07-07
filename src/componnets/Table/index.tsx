import { clsx } from "clsx";
import { ReactNode } from "react";

export interface IRows {
    [key: string]: string;
}

export interface IColumns {
    [key: string]: {
        value: ReactNode;
        header?: (item: any) => ReactNode;
        cell?: (item: any) => ReactNode;
    };
}

interface IProps {
    rows: IRows[];
    columns: IColumns;
}

export const Table = ({ rows, columns }: IProps) => {
    return (
        <div className="border border-gray-300 rounded-lg shadow-sm shadow-slate-100 transition-all">
            {Object.keys(columns).length <= 0 ? (
                <div className="p-4 text-center text-gray-400 font-bold">
                    <h1>Não há dados para serem exibidos</h1>
                </div>
            ) : (
                <table className="table-auto w-full h-full ">
                    <thead>
                        <tr className="border-b border-gray-300 bg-gray-100">
                            {Object.entries(columns).map(([key, value]) => (
                                <th
                                    key={key}
                                    className="p-4 text-start text-gray-700 font-bold "
                                >
                                    {value?.header
                                        ? value.header(value)
                                        : value.value}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {rows.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={Object.keys(columns).length}
                                    className="p-4 text-center text-gray-400 font-bold"
                                >
                                    <h1>Não há dados para serem exibidos</h1>
                                </td>
                            </tr>
                        ) : (
                            <>
                                {rows.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {Object.keys(columns).map(
                                            (colKey, colIndex) => (
                                                <td
                                                    key={colKey}
                                                    className={clsx(
                                                        "p-4 text-gray-500 border-b border-gray-300",
                                                        {
                                                            "font-semibold !text-gray-600":
                                                                colIndex === 0,
                                                        }
                                                    )}
                                                >
                                                    {columns[colKey]?.cell !==
                                                    undefined
                                                        ? columns[colKey].cell!(
                                                              row
                                                          )
                                                        : row[colKey]}
                                                </td>
                                            )
                                        )}
                                    </tr>
                                ))}
                            </>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};
