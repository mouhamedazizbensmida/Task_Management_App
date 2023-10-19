import React from 'react'
import AddTask from '../../components/taskmanagement/AddTask';
import TaskList from '../../components/taskmanagement/TaskList';
import Sidebar from '../../components/sidebar/Sidebar';

const TaskManager = (items) => {
  const { status } = items;
  return (
    <div><div className='taskmanager'>
      	<Sidebar/>
      <div className='taskmanager__right' style={{marginLeft:"239.200px",marginTop:"94px"}}>
        <div className="taskmanager__addtask"style={{marginTop:"2%"}}> <AddTask /></div>
        <div className="taskmanager__tasklist" style={{marginTop:"3%"}}><TaskList status={status}/></div>
      </div>
      </div></div>
  )
}

export default TaskManager