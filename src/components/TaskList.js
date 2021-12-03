import Task from "./Task";

const TaskList = ({tasks, deleteTask, moveTask}) => {
  return (
    tasks.map((task, index) => {
      return (
        <Task task={task} index={index} deleteTask={deleteTask} moveTask={moveTask} />
      );
    })
  );
}

export default TaskList;