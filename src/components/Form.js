const Form = ({createTask}) => {
  return (
    <form onSubmit={createTask} className="box">
      <div className="field has-addons">
        <div className="control is-expanded">
          <input className="input" type="text" name="taskName" placeholder="Input TaskName..." />
        </div>
        <div className="control">
          <button type="submit" className="button is-info">
            登録
          </button>
        </div>
      </div>
    </form>
  );
}

export default Form;