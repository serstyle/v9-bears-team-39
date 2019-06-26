import { useEffect, useContext } from 'react';
import AuthContext from '../contexts/auth/authContext';

export default function useLoadUser() {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    console.log('try connect');
    authContext.loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
