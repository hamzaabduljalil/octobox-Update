export interface BaseModel {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const BaseModelDefault: BaseModel = {
  id: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};
