import { BaseModel, BaseModelDefault } from "./BaseModel";
import { MultiLangs, MultiLangsDefault } from "./MultiLangs";
import { Coordinates, CoordinatesDefault } from "./Coordinates";

export interface City extends BaseModel {
  name?: MultiLangs;
  coordinates?: Coordinates;
}
export const CityDefault:City = {
  ...BaseModelDefault,
  name: MultiLangsDefault,
  coordinates: CoordinatesDefault
}

