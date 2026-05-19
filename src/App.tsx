import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";

const HorizonHome = lazy(() => import("./pages/HorizonHome"));
const ResourcesPage = lazy(() => import("./pages/ResourcesPage"));
const ResourceDetailPage = lazy(() => import("./pages/ResourceDetailPage"));
const ResourceThankYouPage = lazy(() => import("./pages/ResourceThankYouPage"));
const SimpleLayout = lazy(() => import("./components/layout/SimpleLayout"));

const queryClient = new QueryClient();

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#03363D]">
    <div className="text-[#BDD9D7] text-lg">Loading...</div>
  </div>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <SimpleLayout>
                    <HorizonHome />
                  </SimpleLayout>
                </Suspense>
              }
            />
            <Route
              path="/resources"
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <SimpleLayout>
                    <ResourcesPage />
                  </SimpleLayout>
                </Suspense>
              }
            />
            <Route
              path="/resources/:slug"
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <SimpleLayout>
                    <ResourceDetailPage />
                  </SimpleLayout>
                </Suspense>
              }
            />
            <Route
              path="/resources/:slug/thank-you"
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <SimpleLayout>
                    <ResourceThankYouPage />
                  </SimpleLayout>
                </Suspense>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
