import * as _ from 'lodash';

export class Entity {
  id: number;

  constructor(params?: object) {
    _.forEach(params, (value, key) => {
      if (!_.isArray(value)) {
        this[key] = value;
      }
    });
  }

  getClassName(): string {
    return this.constructor.toString().match(/\w+/g)[1].toLowerCase();
  }
}
