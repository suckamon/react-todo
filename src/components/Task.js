const Task = ({task, index, deleteTask, moveTask}) => {
  return (
    <div className={`task task-${index}`}>
      <div className="title">
        {task.name}
      </div>
      <div className="regDate">
        {task.date}
      </div>
      <button className="upBtn" onClick={e => moveTask(e, index, -1)}>上へ</button>
      <button className="downBtn" onClick={e => moveTask(e, index, 1)}>下へ</button>
      <button className="delBtn" onClick={e => deleteTask(e, index)}>
        削除
      </button>
    </div>
  );
}

export default Task;