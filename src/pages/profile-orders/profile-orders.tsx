import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getProfileOrderThunk,
  getOrder
} from '../../services/slice/profile-orders-slice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getOrder);
  useEffect(() => {
    dispatch(getProfileOrderThunk());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
