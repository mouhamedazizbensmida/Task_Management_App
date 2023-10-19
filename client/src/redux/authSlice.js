import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import history from "../history";

const initialUser = localStorage.getItem('auth')
	? JSON.parse(localStorage.getItem('auth'))
	: null;

const initialState = {
	isLoading: false,
	currentUser: initialUser,
	error: null,
};
export const authSlice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.isLoading = false;
		},
		loginFailure: (state, action) => {
			state.error = action.payload;
		},
		registerSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.isLoading = false;
		},
		registerFailure: (state, action) => {
			state.error = action.payload;
		},
		logoutSuccess: (state) => {
			state.currentUser = null;
		},
	
		updateProfileSuccess : (state, action) => {
			state.currentUser = action.payload;
			state.isLoading = false;
		},
		
		updateProfileFailure : (state, action) => {
			state.error = action.payload;
		},
	},
});

export const {
	loginFailure,
	loginSuccess,
	registerFailure,
	registerSuccess,
	logoutSuccess,
	updateProfileSuccess,
	updateProfileFailure,
} = authSlice.actions;

export default authSlice.reducer;

export const register = (user) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'content-type': 'application/json',
			},
		};

		const response = await axios.post(
			'http://localhost:4000/auth/register',
			user,
			config
		);

		if (response) {
			dispatch(registerSuccess(response.data));		
		    history.push('/signin')
			window.location.reload();
		} else {
			dispatch(registerFailure());
		}
	}catch (error) {
		// Handle errors from the backend response
		if (error.response.data) {
			console.log(error.response.data)
		  return error.response.data
		} 
	  }
};
export const signin = user =>async(dispatch)=>{
	try {
		const response = await axios.post(
			'http://localhost:4000/auth/signin',
			user,
		);
		if(response){
			localStorage.setItem('auth',JSON.stringify(response.data))
		    dispatch(loginSuccess(response.data))
		    history.push('/dashboard');
			window.location.reload();
		}else {dispatch(loginFailure())}
	} catch (error) {
		// Handle errors from the backend response
		if (error.response.data) {
			console.log(error.response.data)
		  return error.response.data
		} 
	  }
}
export const UpdateProfile = (Updateduser) => async (dispatch) => {
    try {
        const response = await axios.put('http://localhost:4000/auth/setting', Updateduser);
        if (response) {
            localStorage.setItem('auth', JSON.stringify(response.data));
            dispatch(updateProfileSuccess(response.data));
			history.push('/dashboard');
			window.location.reload();
        } else {
            dispatch(updateProfileFailure());
        }
    } catch (error) {
		// Handle errors from the backend response
		if (error.response.data) {
			console.log(error.response.data)
		  return error.response.data
		}
	  }
};
