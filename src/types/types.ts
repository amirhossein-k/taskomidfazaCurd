export interface UserType {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}
export interface SingleUSerResponse {
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
}


export type UsersResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UserType[];
  support: {
    url: string;
    text: string;
  };
};

export interface CreateUserType{
  id:string
    createdAt: string
}

export interface RegisterResponse {
  id:number
  token:string
    createdAt: string
}
export type InternalRegisterResponse = {
  success: boolean;
  error:boolean
  errorMessage:string
};


export type ResCustom<T ,R> = {
  data: T | R;
  status: {
    message: string;
    error: boolean;
    success: boolean;
  };
};