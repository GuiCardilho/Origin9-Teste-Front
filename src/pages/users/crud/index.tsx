import { useLayoutEffect, useEffect, useState } from "react";
import {
    HiOutlineTrash,
    HiOutlineEye,
    HiOutlineCheck,
    HiOutlineX,
    HiUserAdd,
} from "react-icons/hi";
import api from "../../../services/api";
import { sendToast } from "../../../util/toast";
import { AxiosResponse } from "axios";
import { Table } from "../../../componnets/Table";
import { useDialog } from "../../../hooks/dialog";
import { IPropsDialogModal } from "../../../componnets/Dialog";
import { Input } from "../../../componnets/Input";
import { Modal } from "../../../componnets/Modal";
import { FormModal } from "../../../componnets/FormModal";
import { IColumns, IRows } from "../../../componnets/Table";
import clsx from "clsx";
import { useLoading } from "../../../hooks/loading";

interface IEdit {
    message: string;
    rows: IRows;
}

interface ISelectOption {
    value: string;
    text: string;
}
interface ItemModal {
    title: string;
    name: string;
    placeholder?: string;
    mask?: string;
    type?: string;
    select?: {
        options: ISelectOption[];
    };
}
interface IResponseGet {
    columns: IColumns;
    rows: IRows[];
    message: string;
    modal: ItemModal[];
    title: string;
}

export const CRUDUPage = () => {
    const columnsAdm: IColumns = {
        nome: {
            value: "Nome",
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
        cargo: {
            value: "Cargo",
        },
        funcao: {
            value: "Função",
        },
        status: {
            value: "Status",
        },
        options: {
            value: "Opções",
            header(item) {
                return (
                    <div className="flex flex-1 justify-center items-center">
                        {item.value}
                    </div>
                );
            },
            cell: (item) => {
                return (
                    <div className="flex gap-4 flex-1 w-full h-full justify-center items-center ">
                        <div className="flex p-2 border border-gray-300 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-all">
                            <HiOutlineTrash
                                size={24}
                                onClick={() => {
                                    deleteForm(item?._id);
                                }}
                                className="text-red-500 cursor-pointer"
                            />
                        </div>
                        <div className="flex p-2 border border-gray-300 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-all">
                            <HiOutlineEye
                                size={24}
                                onClick={() => {
                                    editForm(item?._id);
                                }}
                                className="text-green-700 cursor-pointer"
                            />
                        </div>
                    </div>
                );
            },
        },
    };

    const columnsUser: IColumns = {
        nome: {
            value: "Nome",
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
        },
        options: {
            value: "Opções",
            header(item) {
                return (
                    <div className="flex flex-1 justify-center items-center">
                        {item.value}
                    </div>
                );
            },
            cell: (item) => {
                return (
                    <div className="flex gap-4 flex-1 w-full h-full justify-center items-center ">
                        <div className="flex p-2 border border-gray-300 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-all">
                            <HiOutlineTrash
                                size={24}
                                onClick={() => {
                                    deleteForm(item?._id);
                                }}
                                className="text-red-500 cursor-pointer"
                            />
                        </div>
                        <div className="flex p-2 border border-gray-300 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-all">
                            <HiOutlineEye
                                size={24}
                                onClick={() => {
                                    editForm(item?._id);
                                }}
                                className="text-green-700 cursor-pointer"
                            />
                        </div>
                    </div>
                );
            },
        },
    };

    const button = [
        {
            name: "Usuário",
            endpoint: "/users",
            columns: columnsUser,
        },
        {
            name: "Administradores",
            endpoint: "/admins",
            columns: columnsAdm,
        },
    ];

    const { setInfoModal, closeDialog } = useDialog();
    const { initLoading, endLoading } = useLoading();

    const [data, setDdate] = useState<IRows[]>([]);
    const [columns, setColumns] = useState(columnsUser);
    const [search, setSearch] = useState("");
    const [modal, setModal] = useState(false);
    const [disabledSubmitForm, setDisabledSubmitForm] = useState(true);
    const [endpoint, setEndpoint] = useState("/users");
    const [title, setTitle] = useState("");
    const [formRows, setFormRows] = useState<ItemModal[]>([]);
    const [edit, setEdit] = useState(false);

    const [formModal, setFormModal] = useState({
        _id: "",
    });

    const successDialog = (message: string) => {
        const info: IPropsDialogModal = {
            modal: {
                status: true,
                title: {
                    text: `${title} ${message} com sucesso`,
                    icon: <HiOutlineCheck size={28} />,
                },
                description: `O ${title} foi ${message} com sucesso na plataforma!`,
                primarybutton: {
                    text: "Ok",
                    onClick: () => {
                        closeDialog();
                    },
                    id: "ok",
                },
            },
        };
        setInfoModal(info);
    };
    const errorDialog = (message: string) => {
        const info: IPropsDialogModal = {
            modal: {
                status: true,
                type: "error",
                title: {
                    text: `Falha ao ${message}!`,
                    icon: <HiOutlineX size={28} />,
                },
                description: `Houve um erro ao ${message} o ${title} na plataforma, contate o administrador.`,
                primarybutton: {
                    text: "Ok",
                    type: "error",
                    onClick: () => {
                        closeDialog();
                    },
                    id: "ok",
                },
            },
        };
        setInfoModal(info);
    };
    const onChanceFormModal = (
        e:
            | React.ChangeEvent<HTMLSelectElement>
            | React.ChangeEvent<HTMLInputElement>
    ) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormModal((oldValue) => ({ ...oldValue, [name]: value }));
    };
    const ErrorModal = () => {
        const val = Object.values(formModal).map((value) => {
            if (!value) return true;
            else false;
        });

        return val.every((element) => element === true);
    };

    const editForm = async (value: string) => {
        resetForModal();
        const response: AxiosResponse<IEdit> = await api.get(
            `${endpoint}/${value}`
        );

        Object.entries(response.data.rows).forEach(([key, value]) => {
            setFormModal((prevFormModal) => ({
                ...prevFormModal,
                [key]: value,
            }));
        });

        setEdit(true);
        setModal(true);
    };
    const deleteForm = async (id: string) => {
        try {
            await api.delete(`${endpoint}/${id}`);
            successDialog("deletado");
            mountData();
        } catch (error) {
            resetForModal();
        } finally {
            resetForModal();
        }
    };
    const postForm = async () => {
        try {
            await api.post(`${endpoint}`, formModal);
            successDialog("cadastrado");
            mountData();
        } catch (error) {
            errorDialog("cadastrar");
        } finally {
            resetForModal();
        }
    };
    const putForm = async () => {
        try {
            if (formModal?._id) {
                await api.put(`${endpoint}/${formModal._id}`, formModal);
                successDialog("editado");
                mountData();
            }
        } catch (error) {
            errorDialog("editar");
        } finally {
            resetForModal();
        }
    };

    const resetForModal = () => {
        setFormModal({
            _id: "",
        });
        mountData();
    };

    const mountData = async (endProps?: string) => {
        try {
            initLoading();
            const response: AxiosResponse<IResponseGet> = await api.get(
                `${endProps ? endProps : endpoint}?search=${search}`
            );
            setFormRows(response.data.modal);
            setTitle(response.data.title);
            setDdate(response.data.rows);
        } catch (error) {
            sendToast({
                message: "Ops, ocorreu um erro interno no servidor.",
            });
        } finally {
            endLoading();
        }
    };

    useEffect(() => {
        setDisabledSubmitForm(ErrorModal());
    }, [formModal]);

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
        if (endpoint === "/users") setColumns(columnsUser);
        else if (endpoint === "/admins") setColumns(columnsAdm);
    }, [data]);

    useLayoutEffect(() => {
        mountData();
    }, [endpoint]);

    return (
        <main className="!m-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <div className="flex flex-1 gap-4">
                    <Input
                        className="flex flex-1 flex-col gap-1"
                        id="search"
                        label={`Pesquisar ${title}`}
                        input={{
                            name: "search",
                            value: search,
                            placeholder: `Digite o nome do ${title}`,
                            onChange: (e) => {
                                setSearch(e.target.value);
                            },
                            onKeyUp: (e) => {
                                if (e.key == "Enter") mountData();
                            },
                        }}
                        button={{
                            text: "Pesquisar",
                            type: "button",
                            onClick: () => mountData(),
                            className:
                                "bg-gray-50 hover:bg-gray-100 active:bg-gray-200 rounded-lg px-4 transition-all text-gray-600 font-semibold border boder-gray-800",
                        }}
                        secondaryButton={{
                            text: `Adicionar ${title}`,
                            type: "button",
                            onClick: () => {
                                resetForModal();
                                setEdit(false);
                                setModal(true);
                            },
                            className:
                                "bg-gray-300 hover:bg-gray-200 active:bg-gray-100 rounded-lg px-4 transition-all text-gray-600 font-semibold border boder-gray-800",
                        }}
                    />
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
                        onClick={async () => {
                            setEndpoint(item.endpoint);
                            setColumns(item.columns);
                        }}
                    >
                        {item.name}
                    </button>
                ))}
            </div>

            <Modal
                isOpen={modal}
                onClose={() => setModal(false)}
                title={{
                    lefticon: <HiUserAdd size={20} />,
                    text: `${edit ? `Editar ${title}` : `Cadastrar ${title}`}`,
                }}
                element={
                    <FormModal
                        rows={formRows}
                        onChange={onChanceFormModal}
                        value={formModal}
                    />
                }
                primarybutton={{
                    id: "submit",
                    text: `${edit ? `Editar ${title}` : `Cadastrar ${title}`}`,
                    onClick: () => {
                        if (edit) {
                            putForm();
                        } else {
                            postForm();
                        }
                        setModal(false);
                    },
                    disabled: disabledSubmitForm,
                }}
                secondarybutton={{
                    id: "cancel",
                    text: "Cancelar",
                    onClick: () => {
                        setModal(false);
                    },
                }}
            />

            <Table rows={data} columns={columns} />
        </main>
    );
};
