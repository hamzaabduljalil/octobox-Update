import { BaseModel, BaseModelDefault } from "./BaseModel";
import { MultiLangs, MultiLangsDefault } from "./MultiLangs";

export interface Company extends BaseModel {
  name?: MultiLangs;
}
export const CompanyDefault:Company = {
  ...BaseModelDefault,
  name: MultiLangsDefault
}
