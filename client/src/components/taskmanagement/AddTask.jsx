import React, { useState } from 'react';
import { Button, Input } from '@mui/joy';
import { addTask } from '../../redux/taskSlice';
import { useDispatch, useSelector } from 'react-redux';

const AddTask = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));
  const { currentUser } = auth;
  const [state, setState] = useState({
    task: '',
  });
  const [error, setError] = useState(null); // State to store and display errors

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset any previous errors

    try {
      const response = await dispatch(addTask(state.task, currentUser.id));
      if (response) {
        // Handle API error (e.g., validation error from the backend)
		console.log(response)
        setError(response);
      } else {
        setState({
          task: '',
        });
      }
    } catch (error) {
      // Handle network or other errors
      setError('An error occurred while adding the task.');
    }
  };

  return (
    <div style={{ width: '50%', marginLeft: '30%', marginTop: '5%' }}>
      <div>
        <form action='' onSubmit={handleSubmit}>
          <Input
		    required
            type='text'
            name='task'
            placeholder='Add your task'
            onChange={handleChange}
            value={state.task}
            endDecorator={
              <Button onClick={handleSubmit}>Add Task</Button>
            }
          ></Input>
        </form>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
    </div>
  );
};

export default AddTask;
