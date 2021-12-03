import { useState, useEffect } from 'react';
import Form from './components/Form';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  // 初回起動時にセッションストレージからタスクを読み込む
  useEffect(() => {
    const loadTasks = loadFromSessionStorage();
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

  // タスクの追加
  const createTask = (e) => {
    e.preventDefault();
    const { taskName } = e.target.elements;

    if(taskName.value === '') return false;

    const tmpTasks = [{
      name: taskName.value,
      date: dateFormat(new Date()),
    }, ...tasks];

    setTasks(tmpTasks);

    saveToSessionStorage(tmpTasks);

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

    saveToSessionStorage(tmpTasks);
  }

  // タスクを移動 mode:-1なら上へ、1なら下へ移動
  const moveTask = (e, index, mode) => {
    e.preventDefault();

    const replacedTasks = replaceArrayElements(tasks, index+(mode), index);
    setTasks(replacedTasks);

    saveToSessionStorage(replacedTasks);
  }

  // セッションストレージにタスクを保存
  const saveToSessionStorage = (tasks) => {
    try {
      console.log(tasks);
      const serializedTasks = JSON.stringify(tasks);
      sessionStorage.setItem('tasks', serializedTasks);
    } catch(e) {
      console.log(e);
    }
  }

  // セッションストレージからタスクを読み込む
  const loadFromSessionStorage = () => {
    try {
      const serializedTasks = sessionStorage.getItem('tasks');
      if(!serializedTasks) {
        return false;
      }
      return JSON.parse(serializedTasks);
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <>
      <Form createTask={createTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} moveTask={moveTask} />
    </>
  );
}

export default App;
