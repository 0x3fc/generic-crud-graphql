import { Resolver } from "type-graphql";
import { Task } from "../models/Task";
import { TaskService } from "../services/TaskService";
import { createBaseResolver } from "./BaseResolver";

const TaskBaseResolver = createBaseResolver(
  { name: "task" },
  Task,
  new TaskService()
);

@Resolver(() => Task)
export class TaskResolver extends TaskBaseResolver {}
