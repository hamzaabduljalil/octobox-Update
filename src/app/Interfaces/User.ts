import { BaseModel, BaseModelDefault } from "./BaseModel";
import { Img, ImgDefault } from "./Img";
export interface User extends BaseModel {
  name: string;
  username: string;
  email?: string;
  password: string;
  role: string;
  phone?: number;
  address?: string;
  image?: Img;
}
export const UserDefault:User = {
  ...BaseModelDefault,
  name: "",
  username: "",
  password: "",
  role: "",
  phone: 0,
  address: "",
  image: ImgDefault
}
