import { BaseModel, BaseModelDefault } from "./BaseModel";

export interface Range extends BaseModel {
    minRange:number
    maxRange:number
    price:number
}

export const RangeDefault:Range = {
  ...BaseModelDefault,
  minRange: 0,
  maxRange: 0,
  price: 0
}

