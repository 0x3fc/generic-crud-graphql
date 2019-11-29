import {
  CreateTaskInput,
  FindOneTaskInput,
  UpdateTaskInput,
} from "../inputs/TaskInput";
import { Task } from "../models/Task";
import { BaseService } from "./BaseService";
import { BaseServiceConfigFactory } from "./BaseServiceConfig";

const configBuilder = new BaseServiceConfigFactory();
configBuilder.setFindOne({ PayloadType: FindOneTaskInput });
configBuilder.setCreate({ PayloadType: CreateTaskInput });
configBuilder.setUpdate({ PayloadType: UpdateTaskInput });
const config = configBuilder.build();

export class TaskService extends BaseService<Task> {
  constructor() {
    super(Task, config);
  }
}
