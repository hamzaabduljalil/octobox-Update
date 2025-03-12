import { Area, AreaDefault } from "./Area";
import { City, CityDefault } from "./City";

export interface CityArea {
    areas: Area[];
    selectedAreas?: Area[];
    city: City;
}

export const CityAreaDefault: CityArea = {
    areas: [AreaDefault],
    city: CityDefault,
}