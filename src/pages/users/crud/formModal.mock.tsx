export const FormModalUser = [
    {
        title: "Nome",
        name: "nome",
        placeholder: "Insira o nome",
    },
    {
        title: "CPF",
        name: "cpf",
        placeholder: "Insira o CPF",
        mask: "999.999.999-99",
    },
    {
        title: "Data de Nascimento",
        name: "data_nascimento",
        placeholder: "Insira a data de nascimento",
        type: "date",
    },
    {
        title: "Endereço",
        name: "endereco",
        placeholder: "Insira o endereço",
    },
    {
        title: "Status",
        name: "status",
        select: {
            options: [
                { value: "Ativo", text: "Ativo" },
                { value: "Inativo", text: "Inativo" },
            ],
        },
    },
];
