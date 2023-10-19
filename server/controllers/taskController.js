
const Task = require('../../database/models/task.model');

const addTask = async (req, res) => {
	const { task, id } = req.body;
	try {
		if (!task) {
			return res.status(400).json({ error: 'Please enter the task.' });
		  }
		const taskDetail = await new Task({
			task,
			cretedBy: id,
		});
		await taskDetail.save();
		return res.status(200).send(taskDetail);
	} catch (error) {
		return res.status(400).send('task addition failed');
	}
};

const getAllTasks = async (req, res) => {
	const { id } = req.query;
	const {status}  = req.query;
	console.log(status)
	let tasklist
	try {
		if (status !== undefined) {tasklist = await Task.find({ cretedBy: id, status:status });}
		else{tasklist = await Task.find({ cretedBy: id });}
		return res.status(200).send(tasklist);
	} catch (error) {
		return res.status(400).send(error);
	}
};

// const editTask = async (req, res) => {

// };

const statusChange = async (req, res) => {
	const { id, string } = req.body;

	try {
		let task = await Task.findById({ _id: id });
		if (string === 'right') {
			if (task.status === 'backlog') {
				task.status = 'todo';
				task.save();
				return res.send(task);
			} else if (task.status === 'todo') {
				task.status = 'doing';
				task.save();
				return res.send(task);
			} else if (task.status === 'doing') {
				task.status = 'done';
				task.save();
				return res.send(task);
			}
		} else {
			if (task.status === 'done') {
				task.status = 'doing';
				task.save();
				return res.send(task);
			} else if (task.status === 'doing') {
				task.status = 'todo';
				task.save();
				return res.send(task);
			} else if (task.status === 'todo') {
				task.status = 'backlog';
				task.save();
				return res.send(task);
			}
		}
	} catch (error) {}
};

const deleteTask = async (req, res) => {
	const { id } = req.params;
	try {
		let response = await Task.findByIdAndDelete(id);
		return res.status(200).send(response);
	} catch (error) {
		return res.status(400).send('deleteFailed');
	}
};

const UpdateTask = async (req, res) => {
    try {
		let task = await Task.findOne({_id:req.body._id});
		if (!req.body.task) {
			return res.status(400).json({ error: 'Please enter the task.' });
		  }
		task.task=req.body.task

		const updatedtask = await task.save();

        return res.status(200).json({
           _id:updatedtask._id,
           task:updatedtask.task,


        });
    } catch (error) {
        return res.status(400).send(error);
    }
};


module.exports = {
	addTask,
	getAllTasks,
	// editTask,
	statusChange,
	deleteTask,
	UpdateTask,
};