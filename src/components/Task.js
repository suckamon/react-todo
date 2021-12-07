const Task = ({task, index, editTask, deleteTask, moveTask, handleUpdateTask}) => {
  return (
    <div className={`box task task-${index}`}>
      <div className="title">
        {
          (()=> {
            if(task.editMode) {
              return (
                <form className="field has-addons" onSubmit={e => handleUpdateTask(e, index)}>
                  <div className="control is-expanded">
                    <input className="input" type="text" name="taskName" placeholder="Input TaskName..." defaultValue={task.name} />
                  </div>
                  <div className="control">
                    <button type="submit" className="button is-info">
                      更新
                    </button>
                  </div>
                </form>
              );
            } else {
              return (task.name);
            }
          })()
        }
      </div>
      <div className="regDate">
        {task.date}
      </div>
      <button className="button upBtn" onClick={e => moveTask(e, index, -1)}>▲</button>
      <button className="button downBtn" onClick={e => moveTask(e, index, 1)}>▼</button>
      <button className="button editBtn" onClick={e => editTask(e, index)}>
        編集
      </button>
      <button className="button delBtn" onClick={e => deleteTask(e, index)}>
        削除
      </button>
    </div>
  );
}

export default Task;