import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { MainLayout } from './components/MainLayout';
import { AuthView } from './components/AuthView';
import { DashboardView } from './components/DashboardView';
import { PlansView } from './components/PlansView';
import { SuperTasksView } from './components/SuperTasksView';
import { WalletView } from './components/WalletView';
import { AffiliateView } from './components/AffiliateView';
import { HowItWorksView } from './components/HowItWorksView';

// Modals
import { DepositModal } from './components/DepositModal';
import { WithdrawModal } from './components/WithdrawModal';
import { SubscribeModal } from './components/SubscribeModal';
import { TaskRunnerModal } from './components/TaskRunnerModal';
import { AiAssistantModal } from './components/AiAssistantModal';
import { UserProfileModal } from './components/UserProfileModal';

const AppContent: React.FC = () => {
  const { activeTab, isAuthenticated } = useApp();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // If user is not authenticated, show the Account Creation & Login screen first
  if (!isAuthenticated) {
    return <AuthView />;
  }

  return (
    <MainLayout onOpenProfile={() => setIsProfileModalOpen(true)}>
      {/* Dynamic View Rendering based on activeTab */}
      {activeTab === 'dashboard' && <DashboardView />}
      {activeTab === 'plans' && <PlansView />}
      {activeTab === 'tasks' && <SuperTasksView />}
      {activeTab === 'wallet' && <WalletView />}
      {activeTab === 'affiliate' && <AffiliateView />}
      {activeTab === 'how-it-works' && <HowItWorksView />}

      {/* Global Interactive Modals */}
      <DepositModal />
      <WithdrawModal />
      <SubscribeModal />
      <TaskRunnerModal />
      <AiAssistantModal />
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </MainLayout>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
