import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../redux/actions/authActions';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isError } = useSelector(state => state.authReducer);

  useEffect(() => {
    if (!user) dispatch(getProfile());
  }, [user, dispatch]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isError) {
    return <Navigate to="/login" />;
  }
  if (user) {
    return (
      <div>
        Welcome <span className="text-primary">{user.name}</span>
      </div>
    );
  }
};

export default Dashboard;
