import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EvmApp from './App.evm';
import ThankYou from './components/ThankYou';


const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={
          <QueryClientProvider client={queryClient}>
            <EvmApp />
          </QueryClientProvider>
        } />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
};

export default App;