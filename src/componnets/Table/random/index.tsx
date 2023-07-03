import { clsx } from "clsx";

interface IProps<Columns extends Record<string, string>> {
    rows:
        | (Array<{ [key in keyof Columns]: string }> &
              Record<string, unknown>[])
        | [];
    columns: Columns;
}

export const RandomTable = <Columns extends Record<string, string>>({
    rows,
    columns,
}: IProps<Columns>) => {
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
                                </tr>
                            ))}
                        </>
                    )}
                </tbody>
            </table>
        </div>
    );
};
