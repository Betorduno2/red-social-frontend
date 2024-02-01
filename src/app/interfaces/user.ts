export interface user {
  _id?:       string;
  fullName?:  string;
  alias?:     string;
  email?:     string;
  age?:       number;
  password?:  string;
  posts?:     any[];
  createdAt?: Date;
  __v?:       number;
}