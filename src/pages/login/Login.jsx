import { useFormik } from "formik";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const { handleLogin } = useContext(AuthContext);
  const formik = useFormik({
    initialValues: {
      login: "",
      senha: "",
    },
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  return (
    <>
      <h1>Fazer login</h1>
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

        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
