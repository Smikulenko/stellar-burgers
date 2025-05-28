import { Preloader } from '@ui';
import { useSelector } from '../../services/store';
import { Navigate } from 'react-router-dom';
import {
  isAuthCheckedSelector,
  selectUser
} from '../../services/slice/user-slice';
import { useLocation } from 'react-router-dom';
type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};
export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const user = useSelector(selectUser);
  const isAuthChcked = useSelector(isAuthCheckedSelector);
  const location = useLocation();

  if (!isAuthChcked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }
  if (onlyUnAuth && user) {
    return <Navigate replace to='/' />;
  }

  return children;
};
