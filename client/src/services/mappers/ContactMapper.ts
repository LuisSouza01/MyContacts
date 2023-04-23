import { NewContactFormData } from '../../pages/NewContact/useNewContact';

type PersistenceContactType = {
  id: string;
  name: string;
  email: string;
  phone: string;
  category_id: string;
  category_name: string;
}

export type ContactDomainMapper = {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: {
    id: string;
    name: string;
  }
}

class ContactMapper {
  toPersistence(domainContact: NewContactFormData) {
    return {
      id: domainContact.id,
      name: domainContact.name,
      email: domainContact.email,
      phone: domainContact.phone,
      category_id: domainContact.categoryId,
    };
  }

  toDomain(persistenceContact: PersistenceContactType): ContactDomainMapper {
    return {
      id: persistenceContact.id,
      name: persistenceContact.name,
      email: persistenceContact.email,
      phone: persistenceContact.phone,
      category: {
        id: persistenceContact.category_id,
        name: persistenceContact.category_name,
      },
    };
  }
}

export default new ContactMapper();
