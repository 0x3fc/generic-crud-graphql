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
import { IBaseService } from "./BaseService";

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
    name: findOneName,
    nullable: findOneNullable,
    defaultValue: findOneDefaultValue,
    complexity: findOneComplexity,
    PayloadType: FindOnePayload,
    enabled: isFindOneEnabled,
  } = service._config.findOne;
  const {
    name: findName,
    nullable: findNullable,
    defaultValue: findDefaultValue,
    complexity: findComplexity,
    enabled: isFindEnabled,
  } = service._config.find;
  const {
    name: createName,
    nullable: createNullable,
    defaultValue: createDefaultValue,
    complexity: createComplexity,
    PayloadType: CreatePayload,
    enabled: isCreateEnabled,
  } = service._config.create;
  const {
    name: updateName,
    nullable: updateNullable,
    defaultValue: updateDefaultValue,
    complexity: updateComplexity,
    PayloadType: UpdatePayload,
    enabled: isUpdateEnabled,
  } = service._config.update;
  const {
    name: deleteName,
    nullable: deleteNullable,
    defaultValue: deleteDefaultValue,
    complexity: deleteComplexity,
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
      name: findOneName || name,
      nullable: findOneNullable,
      defaultValue: findOneDefaultValue,
      complexity: findOneComplexity,
      deprecationReason: markDeprecation(isFindOneEnabled),
    })
    public async findOne(@Arg("payload") payload: FindOneInput): Promise<T> {
      return service.findOne(payload);
    }

    @Query(() => [model], {
      name: findName || pluralName,
      nullable: findNullable,
      defaultValue: findDefaultValue,
      complexity: findComplexity,
      deprecationReason: markDeprecation(isFindEnabled),
    })
    public async find() {
      return service.find();
    }

    @Mutation(() => model, {
      name: createName || `create${captitalizedName}`,
      nullable: createNullable,
      defaultValue: createDefaultValue,
      complexity: createComplexity,
      deprecationReason: markDeprecation(isCreateEnabled),
    })
    public async create(@Arg("payload") payload: CreateInput): Promise<T> {
      return service.create(payload);
    }

    @Mutation(() => model, {
      name: updateName || `update${captitalizedName}`,
      nullable: updateNullable,
      defaultValue: updateDefaultValue,
      complexity: updateComplexity,
      deprecationReason: markDeprecation(isUpdateEnabled),
    })
    public async update(@Arg("payload") payload: UpdateInput): Promise<T> {
      return service.update(payload);
    }

    @Mutation(() => model, {
      name: deleteName || `delete${captitalizedName}`,
      nullable: deleteNullable,
      defaultValue: deleteDefaultValue,
      complexity: deleteComplexity,
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
