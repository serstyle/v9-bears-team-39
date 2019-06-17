import React from 'react';
import { Helmet } from 'react-helmet';
// components
import Sidebar from '../../components/Sidebar';
import SimpleTabs from '../../components/Tabs';

export default function Dashboard() {
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Sidebar />
      <SimpleTabs />
    </div>
  );
}
