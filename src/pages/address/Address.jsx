import Header from "../../components/header/Header";
import {
  Container,
  ContainerTop,
  ContainerTopRight,
  ContainerAddress,
  ContainerSortFilter,
  AllAddress,
  TitleAddress,
  ModalDelete,
  ButtonModalContainer,
  ButtonsModal,
} from "./Address.styled";
import { AiOutlineSearch, AiFillBell, AiOutlineUser } from "react-icons/ai";
import { BiSortDown } from "react-icons/bi";
import { HiFilter } from "react-icons/hi";
import { AddressContext } from "../../context/AddressContext";
import { useContext, useEffect, useState } from "react";
import AddressList from "./AddressList";
import Modal from "react-modal";

const Address = () => {
  const { getAddress, personAddress, deleteAddress } = useContext(AddressContext);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [idEndereco, setIdEndereco] = useState("");

  Modal.setAppElement("#root");

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "300px",
      height: "150px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      textAlign: "center",
      transform: "translate(-50%, -50%)",
    },
  };

  function openModal(idEndereco) {
    setIsOpen(true);
    setIdEndereco(idEndereco);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <div>
      <Header />
      <div>
        <Container>
          <ContainerTop>
            <h1>Endereços</h1>
            <ContainerTopRight>
              <div>
                <AiOutlineSearch />
                <AiFillBell />
              </div>
              <div>
                <span>usuário</span>
                <div>
                  <AiOutlineUser />
                </div>
              </div>
            </ContainerTopRight>
          </ContainerTop>
          <ContainerAddress>
            <div>
              <span>Todas endereços cadastrados</span>
              <div>
                <ContainerSortFilter>
                  <BiSortDown />
                  <span>Sort</span>
                </ContainerSortFilter>
                <ContainerSortFilter>
                  <HiFilter />
                  <span>Filter</span>
                </ContainerSortFilter>
              </div>
            </div>
            <TitleAddress>
              <span>Nome</span>
              <span>Tipo</span>
              <span>CEP</span>
              <span>Rua</span>
              <span>Número</span>
              <span>Complemento</span>
              <span>Cidade</span>
              <span>Estado</span>
              <span>País</span>
              <span>Ações</span>
            </TitleAddress>
            <AllAddress>
              <AddressList openModal={openModal}/>
            </AllAddress>
          </ContainerAddress>
        </Container>
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ModalDelete>Tem certeza que deseja deletar?</ModalDelete>
        <ButtonModalContainer>
          <ButtonsModal onClick={closeModal}>Fechar</ButtonsModal>
          <ButtonsModal onClick={() => deleteAddress(idEndereco, setIsOpen)}>Deletar</ButtonsModal>
        </ButtonModalContainer>
      </Modal>
      </div>
    </div>
  );
};

export default Address;
