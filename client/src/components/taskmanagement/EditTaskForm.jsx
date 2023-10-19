import React, { useState } from 'react';
import axios from 'axios';
import InputGroup from "./InputGroup";
import { Button, useTheme} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import { UpdateTask } from '../../redux/taskSlice';
function EditUserForm({ taskData, onClose, onSave }) {
//Get AllTasks
  let _id=taskData;
  const dispatch = useDispatch();
	const { task } = useSelector((state) => ({ ...state }));
  const { AllTasks } = task;
  const foundTask = AllTasks.find(task => task._id === _id);
// console.log(AllTasks)
// console.log(taskData)
// console.log(foundTask)
    const theme = useTheme();
    const [formData, setFormData] = React.useState({
      _id:_id,
      task:foundTask.task,
    });
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  const onSubmitHandler = async(event) => {
    event.preventDefault();
    dispatch(UpdateTask(formData,onSave));
    
  };


  return (
    <div >
        
      <form onSubmit={onSubmitHandler} >
          
        <TextField
         required
         fullWidth
         id="task"
         label="task"
         name="task"
         value={formData.task}
         onChange={handleChange}
          />
  
          
         <Button variant="outlined" type="submit" sx={{ color: theme.palette.secondary[300] }} style={{"w_idth":"20%", "height":"10%","marginTop":"1%"}}>Update user</Button>
         <Button variant="outlined" type="button" onClick={onClose } sx={{ color: theme.palette.secondary[300] }} style={{"w_idth":"20%", "height":"10%","marginTop":"1%","marginLeft":"0.3%"}}>Cancel</Button>
      </form>
    </div>
  );
}

export default EditUserForm;
