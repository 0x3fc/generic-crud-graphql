import { ClassType } from "type-graphql";
import { BaseCreateInput, BaseFindOneInput } from "../inputs/BaseInput";

export interface IBaseServiceConfigField {
  enabled: boolean;
  PayloadType: ClassType;
}

export class BaseServiceConfig {
  public findOne: IBaseServiceConfigField = {
    enabled: true,
    PayloadType: BaseFindOneInput,
  };
  public find: IBaseServiceConfigField = {
    enabled: true,
    PayloadType: Object,
  };
  public create: IBaseServiceConfigField = {
    enabled: true,
    PayloadType: BaseCreateInput,
  };
}
