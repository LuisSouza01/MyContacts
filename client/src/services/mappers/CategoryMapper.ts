export type CategoryDomainMapper = {
  id: string;
  name: string;
}

class CategoryMapper {
  toDomain(persistenceCategory: CategoryDomainMapper): CategoryDomainMapper {
    return {
      id: persistenceCategory.id,
      name: persistenceCategory.name,
    };
  }
}

export default new CategoryMapper();
