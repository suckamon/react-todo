const Form = ({createTask}) => {
  return (
    <form onSubmit={createTask}>
      <input type="text" name="taskName" />
      <button type="submit">登録</button>
    </form>
  );
}

export default Form;