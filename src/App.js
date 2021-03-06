import { useState, useEffect } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  // 初回起動時にセッションストレージからタスクを読み込む
  useEffect(() => {
    const loadTasks = loadFromLocalStorage();
    setTasks(loadTasks);
  }, [setTasks]);

  // 日付フォーマット（Y-m-d H:i:s）
  const dateFormat = (date) => {
    return `${date.getFullYear()}-${('0'+(date.getMonth()+1)).slice(-2)}-${('0'+date.getDate()).slice(-2)} ${('0'+date.getHours()).slice(-2)}:${('0'+date.getMinutes()).slice(-2)}:${('0'+date.getSeconds()).slice(-2)}`;
  }

  // 配列要素の入れ替え
  const replaceArrayElements = (array, targetId, sourceId) => {
    if(targetId < 0) return array;
    if(targetId > (array.length - 1)) return array;
    
    return array.reduce((resultArray, element, id, originalArray) => [
        ...resultArray,
        id === targetId ? originalArray[sourceId] :
        id === sourceId ? originalArray[targetId] :
        element
    ], []);
  }

  // タスクの編集
  const editTask = (e, index) => {
    e.preventDefault();

    const tmpTasks = tasks.map((task, idx) => {
      if(idx === index) {
        task.editMode = true;
      }
      return task;
    });

    setTasks(tmpTasks);
  }

  // タスクの更新
  const handleUpdateTask = (e, index) => {
    e.preventDefault();
    const { taskName } = e.target.elements;
    if(taskName.value === '') return false;

    const tmpTasks = [...tasks];
    
    tmpTasks[index] = {
      name: taskName.value,
      date: dateFormat(new Date()),
      editMode: false,
    }

    setTasks(tmpTasks);
    saveToLocalStorage(tmpTasks);

  }

  // タスクの追加
  const createTask = (e) => {
    e.preventDefault();
    const { taskName } = e.target.elements;
    if(taskName.value === '') return false;

    const tmpTasks = [{
      name: taskName.value,
      date: dateFormat(new Date()),
      editMode: false,
    }, ...tasks];

    setTasks(tmpTasks);

    saveToLocalStorage(tmpTasks);

    taskName.value = '';
    taskName.focus();
  }

  // タスクの削除
  const deleteTask = (e, index) => {
    e.preventDefault();
    console.log('Delete:'+index);

    let tmpTasks = [...tasks];
    tmpTasks.splice(index, 1);
    setTasks(tmpTasks);

    saveToLocalStorage(tmpTasks);
  }

  // タスクを移動 mode:-1なら上へ、1なら下へ移動
  const moveTask = (e, index, mode) => {
    e.preventDefault();

    const replacedTasks = replaceArrayElements(tasks, index+(mode), index);
    setTasks(replacedTasks);

    saveToLocalStorage(replacedTasks);
  }

  // セッションストレージにタスクを保存
  const saveToLocalStorage = (tasks) => {
    try {
      const serializedTasks = JSON.stringify(tasks);
      localStorage.setItem('tasks', serializedTasks);
    } catch(e) {
      console.log(e);
    }
  }

  // セッションストレージからタスクを読み込む
  const loadFromLocalStorage = () => {
    try {
      const serializedTasks = localStorage.getItem('tasks');
      if(!serializedTasks) {
        return [];
      }
      return JSON.parse(serializedTasks);
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <section className="section">
      <div className="container">
        <Header />
        <Form createTask={createTask} />
        <TaskList tasks={tasks} editTask={editTask} handleUpdateTask={handleUpdateTask} deleteTask={deleteTask} moveTask={moveTask} />
      </div>
    </section>
  );
}

export default App;
