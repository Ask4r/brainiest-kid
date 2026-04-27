import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { RouteProvider } from "@/app/providers/route-provider";
import { ThemeProvider } from "@/app/providers/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MainLayout } from "@/app/layouts/MainLayout";
import { WSRouteLayout } from "@/app/layouts/WSRouteLayout";
import { NotFoundPage } from "@/app/pages/404/NotFoundPage";
import { LoadingScreen } from "@/app/components/LoadingScreen";
import { SessionStateGuard } from "@/app/layouts/SessionStateGuard";

import TestPage from "@/app/pages/test/TestPage";

const HomePage = lazy(() => import("@/app/pages/home/HomePage"));
const JoinPage = lazy(() => import("@/app/pages/join/JoinPage"));
const CreatePage = lazy(() => import("@/app/pages/create/CreatePage"));
const LobbyPage = lazy(() => import("@/app/pages/lobby/LobbyPage"));
const GamePage = lazy(() => import("@/app/pages/game/GamePage"));

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <RouteProvider>
          <ThemeProvider>
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                {/* WS session keep alive routes: begin */}
                <Route element={<WSRouteLayout />}>
                  <Route
                    path="/lobby"
                    element={(
                      <MainLayout>
                        <SessionStateGuard>
                          <LobbyPage />
                        </SessionStateGuard>
                      </MainLayout>
                    )}
                  />
                  <Route
                    path="/round1-page"
                    element={(
                      <MainLayout>
                        <SessionStateGuard>
                          <LobbyPage />
                        </SessionStateGuard>
                      </MainLayout>
                    )}
                  />
                  <Route
                    path="/test"
                    element={(
                      <MainLayout>
                        <SessionStateGuard>
                          <TestPage />
                        </SessionStateGuard>
                      </MainLayout>
                    )}
                  />
                  <Route
                    path="/game"
                    element={(
                      <MainLayout>
                        <SessionStateGuard>
                          <GamePage />
                        </SessionStateGuard>
                      </MainLayout>
                    )}
                  />
                </Route>
                {/* WS session keep alive routes: end */}
                <Route
                  index
                  element={(
                    <MainLayout>
                      <HomePage />
                    </MainLayout>
                  )}
                />
                <Route
                  path="/join-game"
                  element={(
                    <MainLayout>
                      <JoinPage />
                    </MainLayout>
                  )}
                />
                <Route
                  path="/create-game"
                  element={(
                    <MainLayout>
                      <CreatePage />
                    </MainLayout>
                  )}
                />
                <Route
                  path="*"
                  element={(
                    <MainLayout>
                      <NotFoundPage />
                    </MainLayout>
                  )}
                />
              </Routes>
            </Suspense>
          </ThemeProvider>
        </RouteProvider>
      </BrowserRouter>
    </QueryClientProvider >
  );
}
