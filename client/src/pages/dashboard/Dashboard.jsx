
import { Link } from 'react-router-dom';
import Button from '@mui/joy/Button'
import './dashboard.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTasks } from '../../redux/taskSlice';
import { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import BreakdownChart from '../../components/BeakDown/BreakdownChart';

const Dashboard = () => {
	
	const tasklist = useSelector((state) => state.task);
	const { AllTasks } = tasklist;
	const user = useSelector((state) => state.auth);
	const { currentUser } = user;

	let pendingTask = [];
	let doingTask = [];
	let backlogTask = [];
	let completedTask = [];
	for (let i = 0; i < AllTasks.length; i++) {
		if (AllTasks[i].status === 'todo') {
			pendingTask.push(AllTasks[i]);
		} else if (AllTasks[i].status === 'done') {
			completedTask.push(AllTasks[i]);
		}
		else if (AllTasks[i].status === 'doing') {
			doingTask.push(AllTasks[i]);
		}else  {
			backlogTask.push(AllTasks[i]);
		}
	}

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllTasks(currentUser.token, currentUser.id));
	}, [dispatch, currentUser.token, currentUser.id]);

	
	return (
		<div >
			<div className='dashboard'>
				<div className='dashboard__left'>
					
				</div>
				<div className='dashboard__right' style={{marginLeft:"98.200px",marginTop:"80px"}}>
					<div className='dashboard__rightContent'>
						<h2>Task Status Dashboard</h2>
						<div style={{ width: "100%", height: "400px",marginTop:"3%" }}>
						<BreakdownChart isDashboard={true} />
						</div>
						<div className='createButton'>
                        <a href="/backlog" >
                          <Button style={{ width: "30%" }}>Create Task</Button>
                          </a>
                          </div>
						 

						


						{/* <div className='taskcount' style={{paddingLeft:"23%"}}>
						<Grid container rowSpacing={0.2} columnSpacing={{ xs: 0.2, sm: 0.2, md: 0.2 }}>
                      <Grid item xs={6}>
                           <div className='backlog box'>Backlog :{backlogTask.length}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className='todo box'>Todo :{pendingTask.length}</div>
                         </Grid>
                         <Grid item xs={6}>
                             <div className='doing box'>Doing :{doingTask.length}</div>
                          </Grid>
                         <Grid item xs={6}>
                             <div className='done box'>Done :{completedTask.length}</div>
                          </Grid>
                          </Grid>
						</div> */}
						
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;