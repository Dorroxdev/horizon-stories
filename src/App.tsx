import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import HomePage from "./pages/HomePage";
import StoriesPage from "./pages/StoriesPage";
import FailuresPage from "./pages/FailuresPage";
import PlaybooksPage from "./pages/PlaybooksPage";
import GuidesPage from "./pages/GuidesPage";
import StoryDetailPage from "./pages/StoryDetailPage";
import PodcastPage from "./pages/PodcastPage";
import NewsletterPage from "./pages/NewsletterPage";
import AboutPage from "./pages/AboutPage";
import GuestsPage from "./pages/GuestsPage";
import TopicsPage from "./pages/TopicsPage";
import SubmitPage from "./pages/SubmitPage";
import CaseStudiesPage from "./pages/CaseStudiesPage";
import CaseStudyDetailPage from "./pages/CaseStudyDetailPage";
import InsightsPage from "./pages/InsightsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stories" element={<StoriesPage />} />
            <Route path="/stories/:slug" element={<StoryDetailPage />} />
            <Route path="/failures" element={<FailuresPage />} />
            <Route path="/playbooks" element={<PlaybooksPage />} />
            <Route path="/guides" element={<GuidesPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
            <Route path="/insights/:type/:slug" element={<InsightsPage />} />
            <Route path="/podcast" element={<PodcastPage />} />
            <Route path="/newsletter" element={<NewsletterPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/guests" element={<GuestsPage />} />
            <Route path="/topics" element={<TopicsPage />} />
            <Route path="/submit" element={<SubmitPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
