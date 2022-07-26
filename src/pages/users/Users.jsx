import { useFormik } from "formik";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Users = () => {
  const { handleSignUp } = useContext(AuthContext);
  const formik = useFormik({
    initialValues: {
      login: "",
      senha: "",
    },
    onSubmit: (values) => {
      handleSignUp(values);
    },
  });

  return (
    <>
      <h1>Fazer cadastro</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="login">Usuário</label>
        <input
          id="login"
          name="login"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.login}
        />
        <label htmlFor="senha">Senha</label>
        <input
          id="senha"
          name="senha"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.senha}
        />

        <button type="submit">Cadastrar</button>
      </form>
    </>
  );
};

export default Users;
