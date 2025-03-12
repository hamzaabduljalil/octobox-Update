import BaseModel from "./BaseModel";

export default class File extends BaseModel {
  private _url?: string;
  private _name?: string;
  private _base64?: string;
  private _type?: string;

  // Getters and Setters
  get url(): string | undefined {
    return this._url;
  }
  set url(value: string | undefined) {
    this._url = value;
  }

  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
    this._name = value;
  }

  get base64(): string | undefined {
    return this._base64;
  }
  set base64(value: string | undefined) {
    this._base64 = value;
  }

  get type(): string | undefined {
    return this._type;
  }
  set type(value: string | undefined) {
    this._type = value;
  }

  // Override toPlainObject for additional fields
  override toPlainObject(): any {
    return {
      ...super.toPlainObject(),
      url: this._url,
      name: this._name,
      base64: this._base64,
      type: this._type,
    };
  }

  // Override fromJSON for additional fields
  static override fromJSON(json: any): File {
    const obj = super.fromJSON(json) as File;
    obj._url = json.url;
    obj._name = json.name;
    obj._base64 = json.base64;
    obj._type = json.type;
    return obj;
  }
}
