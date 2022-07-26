import axios from "axios";
import { Formik, Form, Field } from "formik";
import InputMask from 'react-input-mask'

const Address = () => {
  
  const handleChange = (event, setFieldValue) => {
    const value = event.target.value;
    buscarCep(value, setFieldValue);
  };

  const buscarCep = async (value, setFieldValue) => {
    const valorSemTraco = value?.replace(/[^0-9]/g, "");
    try {
      const { data } = await axios.get(
        `http://viacep.com.br/ws/${valorSemTraco}/json/`
      );
      console.log(data);
      setFieldValue('logradouro', data.logradouro)
      setFieldValue('bairro', data.bairro)
      setFieldValue('localidade', data.localidade)
      setFieldValue('uf', data.uf)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Endereço</h1>
      <Formik
        initialValues={{
          cep: "",
          logradouro: "",
          bairro: "",
          localidade: "",
          uf: "",
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <Field
            render={() => (
            <InputMask
              name="cep"
              onBlur={(event) => handleChange(event, setFieldValue)}
              mask= "99999-999"
              placeholder="Digite seu cep"/>
            )}/>
            <Field name="logradouro" />
            <Field name="bairro" />
            <Field name="localidade" />
            <Field name="uf" />
            <button type="submit">Cadastrar</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Address;
