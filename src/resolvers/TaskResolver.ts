import { Resolver } from "type-graphql";
import { createBaseResolver } from "../bases/BaseResolver";
import { Task } from "../models/Task";
import { TaskService } from "../services/TaskService";

const TaskBaseResolver = createBaseResolver(
  { name: "task" },
  Task,
  new TaskService()
);

@Resolver(() => Task)
export class TaskResolver extends TaskBaseResolver {}
