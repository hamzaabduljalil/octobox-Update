import { BaseModel, BaseModelDefault } from "./BaseModel";
import { MultiLangs, MultiLangsDefault } from "./MultiLangs";

export interface Vehicle extends BaseModel {
  name: MultiLangs;
}

export const VehicleDefault:Vehicle = {
  ...BaseModelDefault,
  name: MultiLangsDefault
}


