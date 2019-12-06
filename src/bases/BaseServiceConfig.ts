import { ClassType } from "type-graphql";
import {
  BaseCreateInput,
  BaseDeleteInput,
  BaseFindOneInput,
  BaseUpdateInput,
} from "./BaseInput";

type TServiceEndpoint = "findOne" | "find" | "create" | "update" | "delete";

interface IBaseServiceBuilderField {
  name?: string;
  nullable?: boolean | "items" | "itemsAndList";
  defaultValue?: any;
  complexity?: number; // TODO: ComplexityEstimator is also a choise but it is not exported from type-graphql
  enabled?: boolean;
  PayloadType?: ClassType;
}

export interface IBaseServiceConfigField extends IBaseServiceBuilderField {
  enabled: boolean;
  PayloadType: ClassType;
}

type TBaseServiceConfig = {
  [_ in TServiceEndpoint]: IBaseServiceConfigField;
};

export class BaseServiceConfig implements TBaseServiceConfig {
  public readonly findOne: IBaseServiceConfigField = {
    enabled: true,
    PayloadType: BaseFindOneInput,
  };
  public readonly find: IBaseServiceConfigField = {
    enabled: true,
    PayloadType: Object,
  };
  public readonly create: IBaseServiceConfigField = {
    enabled: true,
    PayloadType: BaseCreateInput,
  };
  public readonly update: IBaseServiceConfigField = {
    enabled: true,
    PayloadType: BaseUpdateInput,
  };
  public readonly delete: IBaseServiceConfigField = {
    enabled: true,
    PayloadType: BaseDeleteInput,
  };
}

export class BaseServiceConfigFactory {
  /* Default Configs */
  private findOne: IBaseServiceConfigField = {
    enabled: true,
    PayloadType: BaseFindOneInput,
  };
  private find: IBaseServiceConfigField = {
    enabled: true,
    PayloadType: Object,
  };
  private create: IBaseServiceConfigField = {
    enabled: true,
    PayloadType: BaseCreateInput,
  };
  private update: IBaseServiceConfigField = {
    enabled: true,
    PayloadType: BaseUpdateInput,
  };
  private delete: IBaseServiceConfigField = {
    enabled: true,
    PayloadType: BaseDeleteInput,
  };

  /* Setters */
  public setFindOne(fields: IBaseServiceBuilderField) {
    this.set(fields, "findOne");
  }
  public setFind(fields: IBaseServiceBuilderField) {
    this.set(fields, "find");
  }
  public setCreate(fields: IBaseServiceBuilderField) {
    this.set(fields, "create");
  }
  public setUpdate(fields: IBaseServiceBuilderField) {
    this.set(fields, "update");
  }
  public setDelete(fields: IBaseServiceBuilderField) {
    this.set(fields, "delete");
  }

  public set(
    {
      name,
      nullable,
      defaultValue,
      complexity,
      enabled,
      PayloadType,
    }: IBaseServiceBuilderField,
    endpoint: TServiceEndpoint
  ) {
    name !== undefined && (this[endpoint].name = name);
    nullable !== undefined && (this[endpoint].nullable = nullable);
    defaultValue !== undefined && (this[endpoint].defaultValue = defaultValue);
    complexity && (this[endpoint].complexity = complexity);
    enabled !== undefined && (this[endpoint].enabled = enabled);
    PayloadType && (this[endpoint].PayloadType = PayloadType);
  }

  /* Builder */
  public build() {
    return {
      findOne: this.findOne,
      find: this.find,
      create: this.create,
      update: this.update,
      delete: this.delete,
    } as BaseServiceConfig;
  }
}
