/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// components
import Sidebar from '../../components/Sidebar';
import SimpleTabs from '../../components/Tabs';
// context
import AuthContext from '../../contexts/auth/authContext';
// hooks
import useLoadUser from '../../hooks/useLoadUser';

export default function Dashboard() {
  const authContext = useContext(AuthContext);
  useLoadUser();
  return authContext.loading ? (
    <p>Loading ...</p>
  ) : !authContext.isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Sidebar />
      <SimpleTabs />
    </div>
  );
}
