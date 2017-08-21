import * as _ from 'lodash';

export class Entity {
  public id: number;

  public constructor(params?: object) {
    _.forEach(params, (value: any, key: string) => {
      if (!_.isArray(value)) {
        this[key] = value;

        return;
      }
    });
  }

  public getClassName(): string {
    return this.constructor.toString().match(/\w+/g)[1];
  }
}
