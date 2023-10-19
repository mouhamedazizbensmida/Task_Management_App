import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';



const initialState = {
	AllTasks: {},
};
export const taskSlice = createSlice({
	name: 'Task',
	initialState,

	reducers: {
		taskAddedSuccessfully: (state, action) => {
			state.TaskData = action.payload;
		},
		taskAddFailure: (state) => {
			return state;
		},
		getAllTaskSuccess: (state, action) => {
			state.AllTasks = action.payload;
		},
		getAllTaskFailure: (state) => {
			return state;
		},

		editTaskSuccess: (state, action) => {
			state.TaskData = action.payload;
		},

		deleteSuccess: (state, action) => {
			state.TaskData = action.payload;
		},
		deletefailed: (state) => {
			return state;
		},
		updateTaskSuccess : (state, action) => {
			state.task = action.payload;
			state.isLoading = false;
		},
		
		updateTaskFailure : (state, action) => {
			state.error = action.payload;
		},
	},
});

export const {
	taskAddFailure,
	taskAddedSuccessfully,
	getAllTaskFailure,
	getAllTaskSuccess,
	deleteSuccess,
	deletefailed,
	updateTaskSuccess,
	updateTaskFailure,
} = taskSlice.actions;

export default taskSlice.reducer;

export const addTask = (task, id) => async (dispatch) => {
	const taskData = {
	  task,
	  id,
	};
  
	try {
	  const response = await axios.post('http://localhost:4000/task/add', taskData);
	  
	  if (response.status === 200) {
		localStorage.setItem('task', JSON.stringify(response.data));
		dispatch(taskAddedSuccessfully(response.data));
		window.location.reload(); 
	  } else {
		dispatch(taskAddFailure());
	  }
	} catch (error) {
	  // Handle errors from the backend response
	  if (error.response) {
		return error.response.data.error
	  } else {
		dispatch(taskAddFailure());
	  }
	}
  };

export const getAllTasks = (token, id,status) => async (dispatch) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		params: {
			id,status
		},
	};

	try {
		const response = await axios.get(
			'http://localhost:4000/task/tasks',
			config
		);

		if (response) {
			dispatch(getAllTaskSuccess(response.data));
		}
	} catch (error) {
		if (error.response.status === 400) {
			dispatch(getAllTaskFailure());
		}
	}
};

export const arrowClick = (item, string) => async () => {
	let taskData = {
		id: item._id,
		status: item.status,
		string,
	};

	try {
		let response = await axios.put(
			`http://localhost:4000/task/${taskData.id}`,
			taskData
		);

		if (response) {
			window.location.reload();
		}
	} catch (error) {
		console.log(error);
	}
};

export const deleteItem = (id) => async (dispatch) => {
	// Use a window.confirm dialog for confirmation
	if (window.confirm('Are you sure you want to delete this task?')) {
	  try {
		let res = await axios.delete(`http://localhost:4000/task/${id}`);
		if (res) {
		  dispatch(deleteSuccess());
		  window.location.reload();
		} else {
		  dispatch(deletefailed());
		}
	  } catch (error) {	
		  dispatch(deletefailed());
	} }// If the user cancels, do nothing
  };

export const UpdateTask = (Updatedtask, onSave, history) => async (dispatch) => {
    try {
        const response = await axios.patch('http://localhost:4000/task/backlog', Updatedtask);
		
        if (response) {
            onSave();
            localStorage.setItem('task', JSON.stringify(response.data));
            dispatch(updateTaskSuccess(response.data));
            window.location.reload(); // Reload the page
        } else {
            dispatch(updateTaskFailure());
        }
    } catch (error) {
		
		  dispatch(taskAddFailure());
		
	  }
	};

