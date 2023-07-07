import { IColumns } from "../../../componnets/Table";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

export const columnsUser: IColumns = {
    nome: {
        value: "Nome",
        cell: (item) => {
            return (
                <p className="font-bold text-gray-600 uppercase">
                    {item?.nome}
                </p>
            );
        },
    },
    cpf: {
        value: "CPF",
    },
    data_nascimento: {
        value: "Data de nascimento",
    },
    endereco: {
        value: "Endereço",
    },
    status: {
        value: "Status",
        header: (item) => {
            return <p className="text-red-800">{item.value}</p>;
        },
        cell(item) {
            return (
                <>
                    {item?.status == "Ativo" ? (
                        <div className="flex gap-1 text-green-500 ">
                            <AiFillCheckCircle size={24} /> Ativo
                        </div>
                    ) : (
                        <div className="flex gap-1 text-red-500 ">
                            <AiFillCloseCircle size={24} /> Inativo
                        </div>
                    )}
                </>
            );
        },
    },
};

export const columnsAdm: IColumns = {
    nome: {
        value: "Nome",
        cell: (item) => {
            return (
                <p className="font-bold text-gray-600 uppercase">
                    {item?.nome}
                </p>
            );
        },
    },
    cargo: {
        value: "Cargo",
    },
    salario: {
        value: "Salário",
        cell: (item) => {
            return <>R$ {Number(item?.salario).toFixed(2)}</>;
        },
    },
    status: {
        value: "Status",
        header: (item) => {
            return <p className="text-red-800">{item.value}</p>;
        },
        cell(item) {
            return (
                <>
                    {item?.status == "Ativo" ? (
                        <div className="flex gap-1 text-green-500 ">
                            <AiFillCheckCircle size={24} /> Ativo
                        </div>
                    ) : (
                        <div className="flex gap-1 text-red-500 ">
                            <AiFillCloseCircle size={24} /> Inativo
                        </div>
                    )}
                </>
            );
        },
    },
};

export const columnsCompany: IColumns = {
    empresa: {
        value: "Empresa",
        cell: (item) => {
            return (
                <p className="font-bold text-gray-600 uppercase">
                    {item?.empresa}
                </p>
            );
        },
    },
    cnpj: {
        value: "CNPJ",
    },
    status: {
        value: "Status",
        header: (item) => {
            return <p className="text-red-800">{item.value}</p>;
        },
        cell(item) {
            return (
                <>
                    {item?.status == "Ativo" ? (
                        <div className="flex gap-1 text-green-500 ">
                            <AiFillCheckCircle size={24} /> Ativo
                        </div>
                    ) : (
                        <div className="flex gap-1 text-red-500 ">
                            <AiFillCloseCircle size={24} /> Inativo
                        </div>
                    )}
                </>
            );
        },
    },
};

export const columnsProduct: IColumns = {
    nome: {
        value: "Nome",
        cell: (item) => {
            return (
                <p className="font-bold text-gray-600 uppercase">
                    {item?.nome}
                </p>
            );
        },
    },
    categoria: {
        value: "Categoria",
    },
    preco: {
        value: "Preço",
        cell: (item) => {
            return <>R$ {Number(item?.preco).toFixed(2)}</>;
        },
    },
    validade: {
        value: "Validade",
        header: (item) => {
            return <p className="text-red-800">{item.value}</p>;
        },
    },
};

export const columnsCategory: IColumns = {
    nome: {
        value: "Nome",
    },
    quantidade: {
        value: "Quantidade",
        cell: (item) => {
            return (
                <>
                    {item?.quantidade > 50 ? (
                        <p className="font-bold text-green-600 uppercase">
                            {item?.quantidade}
                        </p>
                    ) : (
                        <p className="font-bold text-red-600 uppercase">
                            {item?.quantidade}
                        </p>
                    )}
                </>
            );
        },
    },
};

export const columnsCoupon: IColumns = {
    nome: {
        value: "Nome",
        cell: (item) => {
            return (
                <p className="font-bold text-gray-600 uppercase">
                    {item?.nome}
                </p>
            );
        },
    },
    produto: {
        value: "Produto",
    },
    categoria: {
        value: "Categoria",
    },
    vl_total: {
        value: "Valor total",
        cell: (item) => {
            return <>R$ {Number(item?.vl_total).toFixed(2)}</>;
        },
    },
    desconto: {
        value: "Desconto",
        cell: (item) => {
            return <>R$ {Number(item?.desconto).toFixed(2)}</>;
        },
    },
    vl_desconto: {
        value: "Valor do desconto",
        cell: (item) => {
            return (
                <>
                    R$ R${" "}
                    {(Number(item?.vl_total) - Number(item?.desconto)).toFixed(
                        2
                    )}
                </>
            );
        },
    },
    validade: {
        value: "Validade",
        header: (item) => {
            return <p className="text-red-800">{item.value}</p>;
        },
    },
};
