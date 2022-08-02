import { useContext } from "react";
import { AddressContext } from "../../context/AddressContext";
import { FormatCepToRender } from "../../utils/globalFunctions";
import { ButtonUpdateDelete, AddressCard } from "./Address.styled";

const AddressList = ({openModal}) => {
  const {navigateToUpdateAddress, personAddress} = useContext(AddressContext)
  return (
    <>
    {personAddress.map((item, i) => (
      item.enderecos.map((end,i) =>(
        <AddressCard key={i}>
        <p>{item.nome}</p>
        <p>{end.tipo}</p>
        <p>{FormatCepToRender(end.cep)}</p>
        <p>{end.cidade}</p>
        <p>{end.estado}</p>
        <div>
          <ButtonUpdateDelete onClick={() => navigateToUpdateAddress(item.idPessoa, end.idEndereco)}>
            Atualizar
          </ButtonUpdateDelete>
          <ButtonUpdateDelete onClick={() => openModal(end.idEndereco)}>
            Deletar
          </ButtonUpdateDelete>
        </div>
      </AddressCard>
    ))
    ))}
  </>
  )
}

export default AddressList