import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PositionsPage } from './pages/PositionsPage';
import { PositionMatchesPage } from './pages/PositionMatchesPage';
import { TalentPage } from './pages/TalentPage';
import { HeroProfilePage } from './pages/HeroProfilePage';
import { HeroRolesPage } from './pages/HeroRolesPage';
import { NotFoundPage } from './pages/NotFoundPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 pt-16">
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Navigate to="/positions" replace />} />
                <Route path="/positions" element={<PositionsPage />} />
                <Route path="/positions/:id/matches" element={<PositionMatchesPage />} />
                <Route path="/talent" element={<TalentPage />} />
                <Route path="/talent/:id" element={<HeroProfilePage />} />
                <Route path="/talent/:id/roles" element={<HeroRolesPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </ErrorBoundary>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
