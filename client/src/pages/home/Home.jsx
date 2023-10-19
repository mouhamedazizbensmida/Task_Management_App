// Import the necessary styles and components
import './home.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@mui/joy/Button';
import Sidebar from '../../components/sidebar/Sidebar';

const Home = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { currentUser } = auth;

  return (
    <div className='home'>

      <div className='home__container'>
        <p style={{ color: "#1976d2", fontSize: "15px", fontWeight: "bolder" }}>
          With Task Management App
        </p>

        {currentUser && currentUser.token ? (
          <Link to='/dashboard'>
            <Button>Let's Start</Button>
          </Link>
        ) : (
          <Link to='/signin' className='button'>
            <Button>Let's Start</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
