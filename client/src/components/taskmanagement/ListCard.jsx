/* eslint-disable react/prop-types */
import './listcard.scss';
import React, { useState } from "react";
import { BiChevronLeft, BiChevronRight, BiTrash } from 'react-icons/bi';
import { arrowClick, deleteItem } from '../../redux/taskSlice';
import { useDispatch } from 'react-redux';
import {IconButton, Dialog, DialogContent, DialogTitle } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import EditTaskForm from './EditTaskForm';


const ListCard = (items) => {
	const { item } = items;

	const dispatch = useDispatch();

	const ArrowClick = (string) => {
		dispatch(arrowClick(item, string));
	};
	const handleDelete = () => {
		dispatch(deleteItem(item._id));
	};
	const handleUpdate = () => {
		setOpenEditDialog(true);
	};
	/*start Update */
 const [openEditDialog, setOpenEditDialog] = useState(false);
 const handleCloseEditDialog = () => {
   setOpenEditDialog(false);
 };

 const handleSaveEditDialog = () => {
   setOpenEditDialog(false);
   // Optionally, you can refresh data here or update state if needed
 };
  /*End Update */
	return (
		<div>
			<ul className={` ${item.status === 'done' ? 'completed menu' : 'menu'}`}>
				<li>
					<p>{item.task}</p>
				</li>
				<li>
					<p>{item.status}</p>
				</li>
				<li style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
  <div>
    <button
      disabled={item.status === 'backlog'}
      onClick={() => ArrowClick('left')}
    >
      <BiChevronLeft />
    </button>
    <button
      disabled={item.status === 'done'}
      onClick={() => ArrowClick('right')}
    >
      <BiChevronRight />
    </button>
  </div>
  {item.status !== "done" && (
    <div>
      <button onClick={handleDelete}>
        <BiTrash />
      </button>
      <IconButton onClick={handleUpdate}>
        <EditIcon />
      </IconButton>
    </div>
  )}
</li>

			</ul>

			<Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                    <DialogTitle>Edit User</DialogTitle>
                    <DialogContent>
                          {(
                            <EditTaskForm
                              taskData={item._id}
                              onClose={handleCloseEditDialog}
                              onSave={handleSaveEditDialog}
                            />
                          )}
                      </DialogContent>
                    </Dialog>
		</div>
	);
};

export default ListCard;