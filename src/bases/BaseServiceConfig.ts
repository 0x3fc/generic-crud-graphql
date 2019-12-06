import { ClassType } from "type-graphql";
import {
  BaseCreateInput,
  BaseDeleteInput,
  BaseFindOneInput,
  BaseUpdateInput,
} from "./BaseInput";

interface IBaseServiceBuilderField {
  enabled?: boolean;
  PayloadType?: ClassType;
}

export interface IBaseServiceConfigField extends IBaseServiceBuilderField {
  enabled: boolean;
  PayloadType: ClassType;
}

export class BaseServiceConfig {
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
  public setFindOne({ enabled, PayloadType }: IBaseServiceBuilderField) {
    enabled !== undefined && (this.findOne.enabled = enabled);
    PayloadType && (this.findOne.PayloadType = PayloadType);
  }

  public setFind({ enabled, PayloadType }: IBaseServiceBuilderField) {
    enabled !== undefined && (this.find.enabled = enabled);
    PayloadType && (this.find.PayloadType = PayloadType);
  }

  public setCreate({ enabled, PayloadType }: IBaseServiceBuilderField) {
    enabled !== undefined && (this.create.enabled = enabled);
    PayloadType && (this.create.PayloadType = PayloadType);
  }

  public setUpdate({ enabled, PayloadType }: IBaseServiceBuilderField) {
    enabled !== undefined && (this.update.enabled = enabled);
    PayloadType && (this.update.PayloadType = PayloadType);
  }

  public setDelete({ enabled, PayloadType }: IBaseServiceBuilderField) {
    enabled !== undefined && (this.delete.enabled = enabled);
    PayloadType && (this.delete.PayloadType = PayloadType);
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
