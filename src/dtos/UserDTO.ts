export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface GetUserDTO {
  email: string;
}