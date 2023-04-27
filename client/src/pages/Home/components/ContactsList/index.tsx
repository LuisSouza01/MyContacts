/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';

import edit from '../../../../assets/images/icons/Edit.svg';
import trash from '../../../../assets/images/icons/Trash.svg';
import arrow from '../../../../assets/images/icons/Arrow.svg';

import Modal from '../../../../components/Modal';
import { ContactDomainMapper } from '../../../../services/mappers/ContactMapper';

import {
  Card,
  ListHeader,
} from './styles';

type ContactsListProps = {
  orderBy: string;
  onToogleOrderBy: () => void;
  filteredContacts: ContactDomainMapper[];
  onDeleteContact: (contact: ContactDomainMapper) => void;
  contactBeingDeleted: ContactDomainMapper | undefined;
  onCloseDeleteContact: () => void;
  onConfirmDeleteContact: () => void;
  isDeleteModalVisible: boolean;
}

const ContactsList = ({
  orderBy,
  onToogleOrderBy,
  filteredContacts,
  onDeleteContact,
  contactBeingDeleted,
  onCloseDeleteContact,
  onConfirmDeleteContact,
  isDeleteModalVisible,
}: ContactsListProps) => (
  <>
    <ListHeader orderBy={orderBy}>
      <button type="button" onClick={onToogleOrderBy}>
        <span>Nome</span>
        <img src={arrow} alt="Ícone de uma seta, em roxo" />
      </button>
    </ListHeader>

    {filteredContacts.map((contact) => (
      <Card key={contact.id}>
        <div className="info">
          <div className="contact-name">
            <strong>{contact.name}</strong>
            {contact.category.name && (
            <small>{contact.category.name}</small>
            )}
          </div>

          <span>{contact.email}</span>
          <span>{contact.phone}</span>
        </div>

        <div className="actions">
          <Link to={`/edit/${contact.id}`}>
            <img src={edit} alt="Ícone de uma caneta em cima de um papel, em azul" />
          </Link>

          <button
            type="button"
            onClick={() => onDeleteContact(contact)}
          >
            <img src={trash} alt="Ícone de uma lixeira, em vermelho" />
          </button>
        </div>
      </Card>
    ))}

    <Modal
      danger
      title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
      confirmLabel="Deletar"
      onCancel={onCloseDeleteContact}
      onConfirm={onConfirmDeleteContact}
      visible={isDeleteModalVisible}
    >
      <p>Esta ação não poderá ser desfeita!</p>
    </Modal>
  </>
);

export default ContactsList;
