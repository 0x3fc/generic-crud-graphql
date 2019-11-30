import { plural } from "pluralize";
import {
  Arg,
  ClassType,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { NotImplementedError } from "../errors/NotImplementedError";
import { IBaseService } from "../services/BaseService";

const markDeprecation = (isEnabled: boolean) =>
  isEnabled ? undefined : "Sorry the endpoint is not available";

interface IBaseResolverConfig {
  name: string;
}

const deprecationFunction = (_?: any): any => {
  throw new NotImplementedError();
};

export const createBaseResolver = <T extends ClassType>(
  { name }: IBaseResolverConfig,
  model: T,
  service: IBaseService<any>
) => {
  /* Construct strings */
  const pluralName = plural(name);
  const captitalizedName = name.captitalize();

  /* Destructure configs */
  const {
    PayloadType: FindOnePayload,
    enabled: isFindOneEnabled,
  } = service._config.findOne;
  const { enabled: isFindEnabled } = service._config.find;
  const {
    PayloadType: CreatePayload,
    enabled: isCreateEnabled,
  } = service._config.create;
  const {
    PayloadType: UpdatePayload,
    enabled: isUpdateEnabled,
  } = service._config.update;
  const {
    PayloadType: DeletePayload,
    enabled: isDeleteEnabled,
  } = service._config.delete;

  /* Construct inputs */
  @InputType(`FindOne${captitalizedName}Payload`)
  class FindOneInput extends FindOnePayload {}
  @InputType(`Create${captitalizedName}Payload`)
  class CreateInput extends CreatePayload {}
  @InputType(`Update${captitalizedName}Payload`)
  class UpdateInput extends UpdatePayload {}
  @InputType(`Delete${captitalizedName}Payload`)
  class DeleteInput extends DeletePayload {}

  /* Build resolver */
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
      name: `create${captitalizedName}`,
      deprecationReason: markDeprecation(isCreateEnabled),
    })
    public async create(@Arg("payload") payload: CreateInput): Promise<T> {
      return service.create(payload);
    }

    @Mutation(() => model, {
      name: `update${captitalizedName}`,
      deprecationReason: markDeprecation(isUpdateEnabled),
    })
    public async update(@Arg("payload") payload: UpdateInput): Promise<T> {
      return service.update(payload);
    }

    @Mutation(() => model, {
      name: `delete${captitalizedName}`,
      deprecationReason: markDeprecation(isDeleteEnabled),
    })
    public async delete(@Arg("payload") payload: DeleteInput): Promise<T> {
      return service.delete(payload);
    }
  }

  if (!isFindOneEnabled) BaseResolver.prototype.findOne = deprecationFunction;
  if (!isFindEnabled) BaseResolver.prototype.find = deprecationFunction;
  if (!isCreateEnabled) BaseResolver.prototype.create = deprecationFunction;
  if (!isUpdateEnabled) BaseResolver.prototype.update = deprecationFunction;
  if (!isDeleteEnabled) BaseResolver.prototype.delete = deprecationFunction;

  return BaseResolver;
};
