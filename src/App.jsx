import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { AnalyticalDashboard } from './pages/AnalyticalDashboard';
import { WearablesConnect } from './pages/WearablesConnect';
import { ClinicalPortal } from './pages/ClinicalPortal';
import { PatientView } from './pages/PatientView';
import { Pricing } from './pages/Pricing';

const PAGES = {
  home: Home,
  login: Login,
  pricing: Pricing,
  dashboard: Dashboard,
  analytics: AnalyticalDashboard,
  wearables: WearablesConnect,
  clinical: ClinicalPortal,
  'patient-view': PatientView,
};

const Router = () => {
  const { activeTab } = useApp();
  const Page = PAGES[activeTab] || Home;
  return <Page />;
};

export default function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}
