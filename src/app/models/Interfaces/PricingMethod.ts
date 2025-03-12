import { BaseModel, BaseModelDefault } from "./BaseModel";
import { MultiLangs, MultiLangsDefault } from "./MultiLangs";

export interface PricingMethod extends BaseModel {
  name: MultiLangs;
  code:Number;
}
export const PricingMethodDefault:PricingMethod = {
  ...BaseModelDefault,
  name: MultiLangsDefault,
  code:0
}

