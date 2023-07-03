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
import { CRUDTable } from "../../../componnets/Table/crud";
import { useDialog } from "../../../hooks/dialog";
import { IPropsDialogModal } from "../../../componnets/Dialog";
import { Input } from "../../../componnets/Input";
import { Modal } from "../../../componnets/Modal";
import { FormModal } from "../../../componnets/FormModal";
import { FormModalUser } from "./formModal.mock";

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

interface IUserEdit {
    message: string;
    user: IUser;
}

interface IResponseUsers {
    users: IUser[];
    message: string;
}

export const CRUDUsersPage = () => {
    const columns = {
        nome: "Nome",
        cpf: "CPF",
        data_nascimento: "Data De Nascimento",
        endereco: "Endereço",
        status: "Status",
    };
    const options = [
        {
            onClick: (value: string) => {
                deleteUser(value);
            },
            icon: <HiOutlineTrash size={24} />,
        },
        {
            onClick: (value: string) => {
                editUser(value);
            },
            icon: <HiOutlineEye size={24} />,
        },
    ];

    const { setInfoModal, closeDialog } = useDialog();
    const [data, setDdate] = useState<IUser[]>([]);
    const [search, setSearch] = useState("");
    const [modal, setModal] = useState(false);
    const [disabledSubmitForm, setDisabledSubmitForm] = useState(true);
    const [edit, setEdit] = useState(false);
    const [formModal, setFormModal] = useState({
        _id: "",
        nome: "",
        cpf: "",
        data_nascimento: "",
        endereco: "",
        status: FormModalUser[4]?.select?.options[0].value,
    });

    const successDialog = (message: string) => {
        const info: IPropsDialogModal = {
            modal: {
                status: true,
                title: {
                    text: `Usuario ${message} com sucesso`,
                    icon: <HiOutlineCheck size={28} />,
                },
                description: `O usuario foi ${message} com sucesso na plataforma!`,
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
                description: `Houve um erro ao ${message} o usuario na plataforma, contate o administrador.`,
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
        if (formModal.nome.length <= 0) {
            return true;
        } else if (formModal.cpf.length <= 11) {
            return true;
        } else if (
            formModal.data_nascimento.length <= 0 ||
            new Date(formModal.data_nascimento) > new Date(Date.now())
        ) {
            return true;
        } else if (formModal.endereco.length <= 0) {
            return true;
        } else return false;
    };
    const editUser = async (value: string) => {
        resetForModal();
        const response: AxiosResponse<IUserEdit> = await api.get(
            `/users/${value}`
        );
        setFormModal({
            _id: response.data.user._id,
            nome: response.data.user.nome,
            cpf: response.data.user.cpf,
            data_nascimento: response.data.user.data_nascimento,
            endereco: response.data.user.endereco,
            status: response.data.user.status,
        });
        setEdit(true);
        setModal(true);
    };

    const deleteUser = async (id: string) => {
        try {
            await api.delete(`/users/${id}`);
            successDialog("deletado");
            mountData();
        } catch (error) {
            resetForModal();
        } finally {
            resetForModal();
        }
    };
    const postUser = async () => {
        try {
            await api.post(`/users`, formModal);
            successDialog("cadastrado");
            mountData();
        } catch (error) {
            errorDialog("cadastrar");
        } finally {
            resetForModal();
        }
    };
    const putUser = async () => {
        try {
            await api.put(`/users/${formModal._id}`, formModal);
            successDialog("editado");
            mountData();
        } catch (error) {
            errorDialog("editar");
        } finally {
            resetForModal();
        }
    };
    const resetForModal = () => {
        setFormModal({
            _id: "",
            nome: "",
            cpf: "",
            data_nascimento: "",
            endereco: "",
            status: FormModalUser[4]?.select?.options[0].value,
        });
    };

    const mountData = async () => {
        try {
            const response: AxiosResponse<IResponseUsers> = await api.get(
                `/users?search=${search}`
            );
            setDdate(response.data.users);
        } catch (error) {
            sendToast({
                message: "Ops, ocorreu um erro interno no servidor.",
            });
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

    useLayoutEffect(() => {
        mountData();
    }, []);

    return (
        <main className="!m-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <div className="flex flex-1 gap-4">
                    <Input
                        className="flex flex-1 flex-col gap-1"
                        id="search"
                        label={"Pesquisar Usuario"}
                        input={{
                            name: "search",
                            value: search,
                            placeholder: "Digite o nome do usuários",
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
                            onClick: mountData,
                            className:
                                "bg-gray-50 hover:bg-gray-100 active:bg-gray-200 rounded-lg px-4 transition-all text-gray-600 font-semibold border boder-gray-800",
                        }}
                        secondaryButton={{
                            text: "Adicionar Usuario",
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

            <Modal
                isOpen={modal}
                onClose={() => setModal(false)}
                title={{
                    lefticon: <HiUserAdd size={20} />,
                    text: `${edit ? "Editar Usuario" : "Criar Usuario"}`,
                }}
                element={
                    <FormModal
                        rows={FormModalUser}
                        onChange={onChanceFormModal}
                        value={formModal}
                    />
                }
                primarybutton={{
                    id: "submit",
                    text: `${edit ? "Editar Usuario" : "Criar Usuario"}`,
                    onClick: () => {
                        if (edit) {
                            putUser();
                        } else {
                            postUser();
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

            <CRUDTable rows={data} columns={columns} options={options} />
        </main>
    );
};
