import { BaseModel, BaseModelDefault } from "./BaseModel";
import { MultiLangs, MultiLangsDefault } from "./MultiLangs";
export interface ShippingType extends BaseModel {
    name: MultiLangs
}
export const ShippingTypeDefault:ShippingType = {
  ...BaseModelDefault,
  name: MultiLangsDefault
}

