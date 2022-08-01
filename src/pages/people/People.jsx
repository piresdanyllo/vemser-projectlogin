import { useEffect, useState, useContext } from "react";
import { PeopleContext } from "../../context/PeopleContext";
import Modal from "react-modal";
import PeopleList from "./PeopleList";
import Header from "../../components/header/Header";
import {
  Container,
  ContainerTop,
  ContainerTopRight,
  ContainerPeople,
  ContainerSortFilter,
  ButtonAdd,
  Peoples,
  TitlePeople,
  ModalDelete,
  ButtonModalContainer,
  ButtonsModal,
} from "./People.styled";
import { AiOutlineSearch, AiFillBell, AiOutlineUser } from "react-icons/ai";
import { BiSortDown } from "react-icons/bi";
import { HiFilter } from "react-icons/hi";

const People = () => {
  const { getPeople, people, navigateToCreate, deletePerson } =
    useContext(PeopleContext);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");

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

  function openModal(id) {
    setIsOpen(true);
    setId(id);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    getPeople();
  }, [getPeople]);

  return (
    <div>
      <Header />
      <div>
        <Container>
          <ContainerTop>
            <h1>Pessoas</h1>
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
          <ContainerPeople>
            <div>
              <span>Todas pessoas cadastradas</span>
              <div>
                <ContainerSortFilter>
                  <BiSortDown />
                  <span>Sort</span>
                </ContainerSortFilter>
                <ContainerSortFilter>
                  <HiFilter />
                  <span>Filter</span>
                </ContainerSortFilter>
                <ButtonAdd onClick={navigateToCreate}>Cadastrar</ButtonAdd>
              </div>
            </div>
            <TitlePeople>
              <span>Nome</span>
              <span>Data de Nascimento</span>
              <span>CPF</span>
              <span>Email</span>
              <span>Ações</span>
            </TitlePeople>
            <Peoples>
              <PeopleList openModal={openModal} />
            </Peoples>
          </ContainerPeople>
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
            <ButtonsModal onClick={() => deletePerson(id, setIsOpen)}>Deletar</ButtonsModal>
          </ButtonModalContainer>
        </Modal>
      </div>
    </div>
  );
};

export default People;
