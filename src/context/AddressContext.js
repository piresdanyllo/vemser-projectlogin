import { createContext, useState } from "react";
import axios from "axios";
import api from '../api'

const AddressContext = createContext();

const AddressProvider = ({ children }) => {

  const [personAddress, setPersonAddress] = useState([]);
  const [address, setAddress] = useState();

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
      setFieldValue("logradouro", data.logradouro);
      setFieldValue("cep", data.cep);
      setFieldValue("localidade", data.localidade);
      setFieldValue("uf", data.uf);
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToCreateAddress = (id) => {
    window.location.href = `/address/create/${id}`;
  };

  const navigateToUpdateAddress = (idPessoa, idEndereco) => {
    window.location.href = `/address/edit/${idPessoa}/${idEndereco}`;
  };

  const getAddress = async () => {
    try {
      const { data } = await api.get(`/pessoa/lista-com-enderecos`);
      setPersonAddress(data);
      const token = localStorage.getItem("token");
      api.defaults.headers.common["Authorization"] = token;
    } catch (error) {
      console.log(error);
    }
  }

  const getAddressById = async (idEndereco) => {
    try {
      const { data } = await api.get(`/endereco/${idEndereco}`);
      setAddress(data);
      const token = localStorage.getItem("token");
      api.defaults.headers.common["Authorization"] = token;
    } catch (error) {
      console.log(error);
    }
  }

  const createAddress = async (idPessoa, values) => {
    try {
      await api.post(`/endereco/{idPessoa}?idPessoa=${idPessoa}`, values);
      const token = localStorage.getItem("token");
      api.defaults.headers.common["Authorization"] = token;
      window.location.href = "/address";
    } catch (error) {
      console.log(error);
    }
  }

  const deleteAddress = async (idEndereco, setIsOpen) => {
    try {
      await api.delete(`/endereco/${idEndereco}`);
      const token = localStorage.getItem("token");
      api.defaults.headers.common["Authorization"] = token;
      window.location.href = "/address";
    } catch (error) {
      console.log(error);
    }
    setIsOpen(false);
  }

  const updateAddress = async (address, idEndereco) => {
    try {
      await api.put(`/endereco/${idEndereco}`, address);
      const token = localStorage.getItem("token");
      api.defaults.headers.common["Authorization"] = token;
      console.log("editado com sucesso");
      window.location.href = "/address";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AddressContext.Provider value={{ getAddress, handleChange, navigateToCreateAddress, navigateToUpdateAddress, createAddress, deleteAddress, updateAddress, getAddressById, personAddress, address }}>
      {children}
    </AddressContext.Provider>
  );
};

export { AddressContext, AddressProvider };
