import { BaseModel, BaseModelDefault } from "./BaseModel";
import { Range, RangeDefault } from "./Range";


export interface Price extends BaseModel {
    code: number;
    price?: number;
    range?: Range[]
}
export const PriceDefault:Price = {
  ...BaseModelDefault,
  code: 0,
  price: 0,
  range: [RangeDefault]
}
