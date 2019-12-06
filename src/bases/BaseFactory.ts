import { getRepository } from "typeorm";

export class BaseFactory<T> {
  constructor(private _model: new () => T) {}
  defaultProperties: any;

  async make(payload?: any) {
    const instance = new this._model();
    Object.assign(instance, this.defaultProperties);
    Object.assign(instance, payload);
    await this.beforeMakeHook(instance);
    return this.getRepository().create(instance);
  }

  async create(payload?: any) {
    const instance = await this.make(payload);
    await this.beforeCreateHook(instance);
    return this.getRepository().save(instance);
  }

  public getRepository() {
    return getRepository<T>(this._model);
  }

  public async beforeMakeHook(instance: T) {}
  public async beforeCreateHook(instance: T) {}
}
