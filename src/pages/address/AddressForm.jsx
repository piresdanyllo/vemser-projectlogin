import { Formik, Form, Field } from "formik";
import { useContext, useEffect, useState } from "react";
import { AddressContext } from "../../context/AddressContext";
import MaskedInput from "react-text-mask";
import Header from "../../components/header/Header";
import { ButtonAdd, ContainerForm } from "../people/People.styled";
import {
  FormatCepToDatabase,
  FormatCepToRender,
} from "../../utils/globalFunctions";
import { useParams } from "react-router-dom";
import { cepMask } from "../../utils/mask";

const AddressForm = () => {
  const {
    handleChange,
    createAddress,
    updateAddress,
    getAddressById,
    address,
  } = useContext(AddressContext);
  const { idPessoa, idEndereco } = useParams();
  const [isUpdate, setIsUpdate] = useState(false);

  const setup = async () => {
    if (idEndereco) {
      getAddressById(idEndereco);
      setIsUpdate(true)
    }
  };
  useEffect(() => {
    setup();
  }, []);

  if (!address && idEndereco !== undefined) {
    return;
  }
  return (
    <>
      <Header />
      <ContainerForm>
        <h1>
          {idEndereco === undefined
            ? "Cadastrar Endereço"
            : "Atualizar Endereço"}
        </h1>
        <Formik
          initialValues={{
            cep: idEndereco === undefined ? "" : "",
            logradouro: idEndereco === undefined ? "" : address.logradouro,
            numero: idEndereco === undefined ? "" : address.numero,
            complemento: idEndereco === undefined ? "" : address.complemento,
            localidade: idEndereco === undefined ? "" : address.cidade,
            uf: idEndereco === undefined ? "" : address.estado,
            pais: idEndereco === undefined ? "" : address.pais,
            tipo: idEndereco === undefined ? "" : address.tipo,
          }}
          onSubmit={(values) => {
            const valuesFormattedForDatabase = {
              idPessoa: parseInt(idPessoa),
              cep: FormatCepToDatabase(values.cep),
              logradouro: values.logradouro,
              numero: parseInt(values.numero),
              complemento: values.complemento,
              cidade: values.localidade,
              estado: values.uf,
              pais: values.pais,
              tipo: values.tipo.toUpperCase(),
            };
            console.log(valuesFormattedForDatabase);
            idEndereco === undefined
              ? createAddress(idPessoa, valuesFormattedForDatabase)
              : updateAddress(valuesFormattedForDatabase, idEndereco);
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <label htmlFor="cep">CEP</label>
              <MaskedInput
                name="cep"
                onBlur={(event) => handleChange(event, setFieldValue)}
                mask={cepMask}
                placeholder="Digite seu cep"
              />
              <label htmlFor="logradouro">Logradouro</label>
              <Field name="logradouro" />
              <label htmlFor="numero">Número</label>
              <Field name="numero" placeholder="Digite o número" />
              <label htmlFor="complemento">Complemento</label>
              <Field name="complemento" placeholder="Digite o complemento" />
              <label htmlFor="localidade">Cidade</label>
              <Field name="localidade" />
              <label htmlFor="uf">Estado</label>
              <Field name="uf" />
              <label htmlFor="pais">País</label>
              <Field name="pais" placeholder="Digite seu país" />
              <label htmlFor="tipo">Tipo</label>
              <Field
                name="tipo"
                placeholder="Digite entre RESIDENCIAL ou COMERCIAL"
              />
              <ButtonAdd type="submit">
                {idEndereco === undefined ? "Cadastrar" : "Atualizar"}
              </ButtonAdd>
            </Form>
          )}
        </Formik>
      </ContainerForm>
    </>
  );
};

export default AddressForm;
