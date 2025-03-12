import { BaseModel, BaseModelDefault } from "./BaseModel";

export interface Img extends BaseModel {
  name: string;
  url: string;
  blurHash: string;
}

export const ImgDefault:Img = {
  ...BaseModelDefault,
  name: "",
  url: "",
  blurHash: ""
}




