import { CreateTaskInput, FindOneTaskInput } from "../inputs/TaskInput";
import { Task } from "../models/Task";
import { BaseService } from "./BaseService";
import { BaseServiceConfig } from "./BaseServiceConfig";

const config: BaseServiceConfig = {
  ...new BaseServiceConfig(),
  findOne: {
    PayloadType: FindOneTaskInput,
    enabled: true,
  },
  create: {
    PayloadType: CreateTaskInput,
    enabled: true,
  },
};

export class TaskService extends BaseService<Task> {
  constructor() {
    super(Task, config);
  }
}
