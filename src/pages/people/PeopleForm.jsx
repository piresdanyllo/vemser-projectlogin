import { Formik } from "formik";
import MaskedInput from "react-text-mask";
import { useParams } from "react-router-dom";
import { dataMask, cpfMask } from "../../utils/mask";
import { PeopleContext } from "../../context/PeopleContext";
import { useState, useEffect, useContext } from "react";
import {
  FormatCpfToDatabase,
  FormatDataToDatabase,
  FormatDataToRender,
} from "../../utils/globalFunctions";
import Header from "../../components/header/Header";
import { ButtonCreateEdit, ContainerForm } from "./People.styled";

const PeopleForm = () => {
  const { createPerson, updatePerson, person, getPersonById } =
    useContext(PeopleContext);
  const { id } = useParams();
  const [isUpdate, setIsUpdate] = useState(false);

  async function setup() {
    if (id) {
      setIsUpdate(true);
      getPersonById(id);
    }
  }

  useEffect(() => {
    setup();
  }, []);

  const user = person && person[0];

  if (!user && isUpdate) {
    return;
  }

  return (
    <>
      <Header />
      <ContainerForm>
        <h1>{id ? "Atualizar cadastro" : "Cadastrar"}</h1>
        <Formik
          initialValues={{
            nome: user ? user.nome : "",
            dataNascimento: user ? FormatDataToRender(user.dataNascimento) : "",
            cpf: user ? user.cpf : "",
            email: user ? user.email : "",
          }}
          onSubmit={(values) => {
            const valuesFormattedForDatabase = {
              nome: values.nome,
              dataNascimento: FormatDataToDatabase(values.dataNascimento),
              cpf: FormatCpfToDatabase(values.cpf),
              email: values.email,
            };
            id
              ? updatePerson(valuesFormattedForDatabase, id)
              : createPerson(valuesFormattedForDatabase);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <label htmlFor="nome">Nome *</label>
              <input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.nome}
                name="nome"
                placeholder="Digite seu nome"
              />
              <label htmlFor="dataNascimento">Data de Nascimento *</label>
              <MaskedInput
                mask={dataMask}
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.dataNascimento}
                name="dataNascimento"
                placeholder="Digite sua data de nascimento"
              />
              <label htmlFor="cpf">CPF *</label>
              <MaskedInput
                mask={cpfMask}
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.cpf}
                name="cpf"
                placeholder="Digite seu CPF"
              />
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.email}
                name="email"
                placeholder="Digite seu email"
              />
              <ButtonCreateEdit type="submit">
                {id ? "Atualizar" : "Cadastrar"}
              </ButtonCreateEdit>
            </form>
          )}
        </Formik>
      </ContainerForm>
    </>
  );
};

export default PeopleForm;
