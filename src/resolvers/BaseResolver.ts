import { plural } from "pluralize";
import {
  Arg,
  ClassType,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { IBaseService } from "../services/BaseService";

const markDeprecation = (isEnabled: boolean) =>
  isEnabled ? undefined : "Sorry the endpoint is not available";

interface IBaseResolverConfig {
  name: string;
}

export const createBaseResolver = <T extends ClassType>(
  { name }: IBaseResolverConfig,
  model: T,
  service: IBaseService<any>
) => {
  const pluralName = plural(name);
  const {
    PayloadType: FindOnePayload,
    enabled: isFindOneEnabled,
  } = service._config.findOne;
  const { enabled: isFindEnabled } = service._config.find;
  const {
    PayloadType: CreatePayload,
    enabled: isCreateEnabled,
  } = service._config.create;

  @InputType(`FindOne${name.captitalize()}Payload`)
  class FindOneInput extends FindOnePayload {}
  @InputType(`Create${name.captitalize()}Payload`)
  class CreateInput extends CreatePayload {}

  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    @Query(() => model, {
      name,
      deprecationReason: markDeprecation(isFindOneEnabled),
    })
    public async findOne(@Arg("payload") payload: FindOneInput): Promise<T> {
      return service.findOne(payload);
    }

    @Query(() => [model], {
      name: pluralName,
      deprecationReason: markDeprecation(isFindEnabled),
    })
    public async find() {
      return service.find();
    }

    @Mutation(() => model, {
      name: `create${name.captitalize()}`,
      deprecationReason: markDeprecation(isCreateEnabled),
    })
    public async create(@Arg("payload") payload: CreateInput): Promise<T> {
      return service.create(payload);
    }
  }

  return BaseResolver;
};
