import { useEffect, useState } from "react";
import { IColumns, IRows, Table } from "../../../componnets/Table";
import api from "../../../services/api";
import { sendToast } from "../../../util/toast";
import { AxiosResponse } from "axios";
import clsx from "clsx";
import {
    columnsAdm,
    columnsCategory,
    columnsCompany,
    columnsCoupon,
    columnsProduct,
    columnsUser,
} from "./values";

interface IResponse {
    rows: IRows[];
    columns: IColumns;
    message: string;
}

export const RandomUsersPage = () => {
    const [rows, setRows] = useState<IRows[]>([]);
    const [columns, setColumns] = useState<IColumns>(columnsUser);

    const [endpoint, setEndpoint] = useState("random/users");
    const [search, setSearch] = useState(10);

    const button = [
        {
            name: "Usuário",
            endpoint: "random/users",
            columns: columnsUser,
        },
        {
            name: "Administradores",
            endpoint: "random/admin",
            columns: columnsAdm,
        },
        {
            name: "Empresas",
            endpoint: "random/company",
            columns: columnsCompany,
        },
        {
            name: "Produtos",
            endpoint: "random/product",
            columns: columnsProduct,
        },
        {
            name: "Categorias",
            endpoint: "random/category",
            columns: columnsCategory,
        },
        {
            name: "Cupons",
            endpoint: "random/coupon",
            columns: columnsCoupon,
        },
    ];

    const mountData = async () => {
        setRows([]);
        try {
            const response: AxiosResponse<IResponse> = await api.get(
                `${endpoint}?amount=${search}`
            );

            setRows(response.data.rows);
        } catch (error) {
            sendToast({
                message: "Ops, ocorreu um erro interno no servidor.",
            });
        }
    };

    useEffect(() => {
        let timerId: NodeJS.Timeout | null = null;

        const delayedRequest = (): void => {
            if (timerId) clearTimeout(timerId);
            timerId = setTimeout(() => {
                mountData();
            }, 1000);
        };

        delayedRequest();

        return (): void => {
            if (timerId) clearTimeout(timerId);
        };
    }, [search]);

    useEffect(() => {
        mountData();
    }, [endpoint]);

    return (
        <main className="!m-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <label className="text-lg text-gray-600 font-semibold">
                    Quantidade de Linhas
                </label>
                <div className="flex flex-1 gap-4">
                    <input
                        value={search}
                        onChange={(e) => {
                            setSearch(Number(e.target.value));
                        }}
                        onKeyUp={(e) => {
                            if (e.key == "Enter") mountData();
                        }}
                        placeholder="Digite a quantidade de usuários"
                        type="number"
                        step={1}
                        min={1}
                        className="border border-gray-300 rounded-lg px-4 py-2 flex-1"
                    />
                    <button
                        type="button"
                        onClick={mountData}
                        className="bg-gray-50 hover:bg-gray-100 active:bg-gray-2    00 rounded-lg px-4 transition-all text-gray-600 font-semibold border boder-gray-800"
                    >
                        Gerar
                    </button>
                </div>
            </div>

            <div className="flex flex-1 justify-center items-center gap-8 my-4 ">
                <h1 className="font-bold text-lg">Endpoints: </h1>
                {button.map((item, index) => (
                    <button
                        key={index}
                        className={clsx(
                            "bg-gray-100 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-200 active:bg-gray-300",
                            {
                                "bg-gray-200": endpoint === item.endpoint,
                            }
                        )}
                        onClick={() => {
                            setEndpoint(item.endpoint);
                            setColumns(item.columns);
                        }}
                    >
                        {item.name}
                    </button>
                ))}
            </div>

            <Table rows={rows} columns={columns} />
        </main>
    );
};
