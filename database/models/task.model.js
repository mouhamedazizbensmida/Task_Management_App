const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
	{
		task: { type: String },
		status: {
			type: String,
			enum: ['backlog', 'todo', 'doing', 'done'],
			default: 'backlog',
		},
		cretedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		// value: {
		// 	type: Number, // Corrected the data type to Number
		// 	default: 1,   // Set a default value of 1
		// }
	},
	{ timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;