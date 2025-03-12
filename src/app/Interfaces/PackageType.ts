import { BaseModel, BaseModelDefault } from "./BaseModel";
import { MultiLangs, MultiLangsDefault } from "./MultiLangs";

export interface PackageType extends BaseModel {
  name: MultiLangs;
}

export const PackageTypeDefault:PackageType = {
  ...BaseModelDefault,
  name: MultiLangsDefault
}


