import Task from "./Task";

const TaskList = ({tasks, editTask, deleteTask, moveTask, handleUpdateTask}) => {
  return (
    tasks.map((task, index) => {
      return (
        <Task task={task} index={index} editTask={editTask} handleUpdateTask={handleUpdateTask} deleteTask={deleteTask} moveTask={moveTask} key={index} />
      );
    })
  );
}

export default TaskList;