import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { RouteProvider } from "@/app/providers/route-provider";
import { ThemeProvider } from "@/ui/providers/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MainLayout } from "@/app/layouts/MainLayout";
import { NotFoundPage } from "@/app/pages/404/NotFoundPage";
import { LoadingScreen } from "@/app/components/LoadingScreen";

import TestPage from "./app/pages/test/TestPage";

const HomePage = lazy(() => import("@/app/pages/home/HomePage"));
const JoinPage = lazy(() => import("@/app/pages/join/JoinPage"));
const CreatePage = lazy(() => import("@/app/pages/create/CreatePage"));
const LobbyPage = lazy(() => import("@/app/pages/lobby/LobbyPage"));
// const Round1Page = lazy(() => import("@/app/pages/round1/Round1Page"));

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <RouteProvider>
          <ThemeProvider>
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                <Route
                  path="/"
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
                  path="/lobby"
                  element={(
                    <MainLayout>
                      <LobbyPage />
                    </MainLayout>
                  )}
                />
                <Route
                  path="/round1-page"
                  element={(
                    <MainLayout>
                      <LobbyPage />
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
                <Route
                  path="/test"
                  element={(
                    <MainLayout>
                      <TestPage />
                    </MainLayout>
                  )}
                />
              </Routes>
            </Suspense>
          </ThemeProvider>
        </RouteProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
