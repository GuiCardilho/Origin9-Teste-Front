import { useLayoutEffect, useEffect, useState } from "react";
import { RandomTable } from "../../../componnets/Table/random";
import api from "../../../services/api";
import { sendToast } from "../../../util/toast";
import { AxiosResponse } from "axios";

interface IUser {
    cpf: string;
    createdAt: Date;
    data_nascimento: string;
    endereco: string;
    nome: string;
    status: "Inativo" | "Ativo";
    __v: number;
    _id: string;
    [key: string]: unknown;
}

interface IResponseUsers {
    users: IUser[];
    message: string;
}

export const RandomUsersPage = () => {
    const columns = {
        nome: "Nome",
        cpf: "CPF",
        data_nascimento: "Data De Nascimento",
        endereco: "Endereço",
        status: "Status",
    };
    const [data, setDdate] = useState<IUser[]>([]);
    const [search, setSearch] = useState(10);

    const mountData = async () => {
        try {
            const response: AxiosResponse<IResponseUsers> = await api.get(
                `/users/random?amount=${search}`
            );
            setDdate(response.data.users);
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

    useLayoutEffect(() => {
        mountData();
    }, []);

    return (
        <main className="!m-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <label className="text-lg text-gray-600 font-semibold">
                    Quantidade de Usuários
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
            <RandomTable rows={data} columns={columns} />
        </main>
    );
};
