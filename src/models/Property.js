import { omit } from "lodash";
import { Restify } from "vue-restify";

export class Property extends Restify {
  static request = {
    prefix: 'api'
  };

  static fields = {
    id: null,
    name: '',
    price: null,
    garages: null,
    storeys: null,
    bedrooms: null,
    bathrooms: null,
  };

  formdata = true;

  constructor() {
    super({
      fields: Property.fields,
      request: Property.request
    });

    this.filters = Object.assign({
      search: '',
      price_to: null,
      price_from: null,
    }, omit(Property.fields, ['name', 'price']));
  }

  get headers() {
    return Object.keys(Property.fields);
  }

  get filterKeys() {
    return Object.keys(omit(this.filters, ['id','search']))
  }

  resetFilters() {
    this.filters = Object.assign({
      search: '',
      price_to: null,
      price_from: null,
    }, omit(Property.fields, ['name', 'price']));
  }
}
