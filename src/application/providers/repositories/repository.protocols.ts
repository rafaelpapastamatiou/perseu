export type FindWithAuth = {
  userId: string;
};

export type FindById = {
  id: string;
};

export type FindByIdWithAuth = FindWithAuth & FindById;
