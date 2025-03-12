import { BaseModel, BaseModelDefault } from "./BaseModel";
import { City, CityDefault } from "./City";
import { MultiLangs, MultiLangsDefault } from "./MultiLangs";
import { Coordinates, CoordinatesDefault } from "./Coordinates";

export interface Area extends BaseModel {
  name?: MultiLangs;
  city?: City | string;
  coordinates?: Coordinates;
}
export const AreaDefault: Area = {
  ...BaseModelDefault,
  name: MultiLangsDefault,
  city: CityDefault,
  coordinates: CoordinatesDefault,
};
