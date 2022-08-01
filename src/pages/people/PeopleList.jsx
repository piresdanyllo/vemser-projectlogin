import { useContext } from "react";
import { PeopleContext } from "../../context/PeopleContext";
import { AddressContext } from "../../context/AddressContext";
import { ButtonUpdateDelete, PeopleCard } from "./People.styled";
import { FormatCpfToRender, FormatDataToRender } from "../../utils/globalFunctions";

const PeopleList = ({ openModal }) => {

  const { navigateToUpdate, people } = useContext(PeopleContext);
  const { navigateToCreateAddress } = useContext(AddressContext);
  return (
    <>
      {people.map((item, i) => (
        <PeopleCard key={i}>
          <p>{item.nome}</p>
          <p>{FormatDataToRender(item.dataNascimento)}</p>
          <p>{FormatCpfToRender(item.cpf)}</p>
          <p>{item.email}</p>
          <div>
            <ButtonUpdateDelete onClick={() => navigateToUpdate(item.idPessoa)}>
              Atualizar
            </ButtonUpdateDelete>
            <ButtonUpdateDelete onClick={() => openModal(item.idPessoa)}>
              Deletar
            </ButtonUpdateDelete>
            <ButtonUpdateDelete onClick={() => navigateToCreateAddress(item.idPessoa)}>
                  Cadastrar Endereço
                </ButtonUpdateDelete>
          </div>
        </PeopleCard>
      ))}
    </>
  );
};

export default PeopleList;
