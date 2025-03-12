import { Area, AreaDefault } from "./Area";
import { BaseModel, BaseModelDefault } from "./BaseModel";
import { City, CityDefault } from "./City";
import { CityArea } from "./CityArea";
import { Company, CompanyDefault } from "./Company";
import { MultiLangs, MultiLangsDefault } from "./MultiLangs";
import { PackageType, PackageTypeDefault } from "./PackageType";
import { Price, PriceDefault } from "./Price";
import { PricingMethod, PricingMethodDefault } from "./PricingMethod";
import { ShippingType, ShippingTypeDefault } from "./ShippingType";
import { Vehicle, VehicleDefault } from "./Vehicle";

export interface Service extends BaseModel {
  name: MultiLangs
  shippingCompany: Company;
  shippingType: ShippingType;
  packageType: PackageType[];
  pricingMethod: PricingMethod[];
  city:City[]
  area:Area[]
  vehicle:Vehicle[]
  price:Price[]
  maxWeight:number
  minWeight:number
  maxWidth:number
  maxHeight:number
  maxLength:number
  maxDimension:number
  from:number
  to:number
  fuelFees:number
  riskFees:number
  cityArea?:CityArea[]
}
export const ServiceDefault:Service = {
  ...BaseModelDefault,
  name: MultiLangsDefault,
  shippingCompany: CompanyDefault,
  shippingType: ShippingTypeDefault,
  packageType: [],
  pricingMethod: [PricingMethodDefault],
  city: [],
  cityArea:[],
  area: [],
  vehicle: [],
  price: [],
  maxWeight: 0,
  minWeight:0,
  maxHeight:0,
  maxWidth:0,
  maxLength:0,
  maxDimension: 0,
  from: 0,
  to: 0,
  fuelFees: 0,
  riskFees: 0
}

