
import './App.css'
import Header from './components/header/Header'
import SignUp from './components/registration/signup'
import SignIn from './components/registration/signin'
import Home from './pages/home/Home'
import Dashboard from './pages/dashboard/Dashboard'
import{ BrowserRouter as  Router, Route, Routes,Navigate} from 'react-router-dom';
import TaskManager from './pages/taskmanagement/TaskManager'
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from './components/sidebar/Sidebar'
import EditProfile from './components/registration/EditProfile'
// import PrivateRoute from './components/PrivateRoute/PrivateRoute'
function App() {
	const dispatch = useDispatch();
	const { auth } = useSelector((state) => ({ ...state }));
  const { currentUser } = auth;
  const routes = [
    { path: '/backlog', status: 'backlog'},
    { path: '/todo', status: 'todo' },
    { path: '/doing', status: 'doing' },
    { path: '/done', status: 'done' },
  ];
  
  return (
  <div>
    
<Router>
{currentUser !== null ? (
					  <Sidebar />
					) :(<>
                <Header />
               </>)}
 
             
          
   
   <Routes>
      <Route path='/' element={currentUser === null ?<Home />  : <Navigate to="/dashboard" />}/>   
      <Route path='/signin' element={<SignIn />}/>
      <Route path='/signup' element={<SignUp />}/>
      <Route path="/dashboard" element={currentUser !== null ? <Dashboard /> : <Navigate to="/" />}/>  
      <Route path='/setting' element={currentUser !== null ? <EditProfile /> : <Navigate to="/" />}/>
      {routes.map((route) => (   
      <Route key={route.path} path={route.path} element={currentUser !== null ? <TaskManager status={route.status} />: <Navigate to="/" />} />
      ))}
 
   </Routes>
</Router>
       
       
  </div>
  )
}

export default App
