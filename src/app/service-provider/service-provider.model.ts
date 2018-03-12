export class ServiceProvider {
  public id: number;
  public name: string;
  public city: string;
  public street: string;
  public building: string;
  public block: string;
  public mobile: string;
  public phone: string;
  public email: string;
  public site: string;
  public classCategories: Array<object>;
  constructor(
    id: number,
    name: string,
    city: string,
    street: string,
    building: string,
    block: string,
    mobile: string,
    phone: string,
    email: string,
    site: string,
    classCategories: Array<object>
  ) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.street = street;
    this.building = building;
    this.block = block;
    this.mobile = mobile;
    this.phone = phone;
    this.email = email;
    this.site = site;
    this.classCategories = classCategories;
  }
}
