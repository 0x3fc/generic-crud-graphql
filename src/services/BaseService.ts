import { getRepository } from "typeorm";
import { ModelNotFoundError } from "../errors/ModelNotFoundError";
import {
  BaseCreateInput,
  BaseDeleteInput,
  BaseFindOneInput,
  BaseUpdateInput,
} from "../inputs/BaseInput";
import { BaseServiceConfig } from "./BaseServiceConfig";

export interface IBaseService<T> {
  _config: BaseServiceConfig;
  findOne(payload: any): Promise<T>;
  find(): Promise<T[]>;
  create(payload: any): Promise<T>;
  update(payload: any): Promise<T>;
  delete(payload: any): Promise<T>;
}

export class BaseService<T> implements IBaseService<T> {
  constructor(
    private _model: new () => T,
    public _config = new BaseServiceConfig()
  ) {}

  public async findOne({ id }: BaseFindOneInput): Promise<T> {
    const instance = await this.getRepository().findOne({ where: { id } });
    if (!instance) {
      throw new ModelNotFoundError();
    }
    return instance;
  }

  public async find() {
    return this.getRepository().find();
  }

  public async create(payload: BaseCreateInput): Promise<T> {
    const instance = new this._model();
    Object.assign(instance, payload);
    return this.getRepository().save(instance);
  }

  public async update(payload: BaseUpdateInput): Promise<T> {
    const instance = await this.getRepository().findOneOrFail(payload.id);
    Object.assign(instance, payload);
    return this.getRepository().save(instance);
  }

  public async delete(payload: BaseDeleteInput): Promise<T> {
    const repository = this.getRepository();
    const instance = await repository.findOneOrFail(payload.id);
    await this.getRepository().delete(payload.id);
    return instance;
  }

  public getRepository() {
    return getRepository<T>(this._model);
  }
}
