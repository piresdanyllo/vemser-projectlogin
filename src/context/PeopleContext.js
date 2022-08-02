import { createContext, useState } from "react";
import api from "../api";
import { toastError, toastSucess } from "../components/toast/Toast";
import { useNavigate } from "react-router-dom";

const PeopleContext = createContext();

const PeopleProvider = ({ children }) => {
  const [people, setPeople] = useState([]);
  const [person, setPerson] = useState();
  const navigate = useNavigate()

  const getPeople = async () => {
    try {
      const { data } = await api.get("/pessoa?pagina=0&tamanhoDasPaginas=20");
      setPeople(data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const getPersonById = async (id) => {
    try {
      const { data } = await api.get(`/pessoa/lista-completa?idPessoa=${id}`);
      setPerson(data);
      const token = localStorage.getItem("token");
      api.defaults.headers.common["Authorization"] = token;
    } catch (error) {
      toastError('Ops! Algo deu errado')
      console.log(error);
    }
  };

  const createPerson = async (person) => {
    try {
      await api.post("/pessoa", person);
      const token = localStorage.getItem("token");
      api.defaults.headers.common["Authorization"] = token;
      toastSucess('Cadastrado com sucesso')
      navigate("/people");
    } catch (error) {
      toastError('Ops! Algo deu errado')
      console.log(error);
    }
  };

  const updatePerson = async (person, id) => {
    try {
      await api.put(`/pessoa/${id}`, person);
      const token = localStorage.getItem("token");
      api.defaults.headers.common["Authorization"] = token;
      toastSucess('Atualizado com sucesso')
      navigate("/people");
    } catch (error) {
      toastError('Ops! Algo deu errado')
      console.log(error);
    }
  };

  const deletePerson = async (id, setIsOpen) => {
    console.log(id);
    try {
      await api.delete(`/pessoa/${id}`);
      const token = localStorage.getItem("token");
      api.defaults.headers.common["Authorization"] = token;
      toastSucess('Deletado com sucesso')
      getPeople();
    } catch (error) {
      toastError('Ops! Algo deu errado')
      console.log(error);
    }
    setIsOpen(false);
  };

  const navigateToUpdate = (id) => {
    window.location.href = `/person/edit/${id}`;
  };

  const navigateToCreate = () => {
    window.location.href = `/person/create`;
  };

  return <PeopleContext.Provider value={{getPeople, getPersonById, createPerson, updatePerson, deletePerson, navigateToUpdate, navigateToCreate, people, person}}>{children}</PeopleContext.Provider>;
};

export { PeopleContext, PeopleProvider };
