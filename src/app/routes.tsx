import { createBrowserRouter } from "react-router";
import DashboardLayout from "./components/DashboardLayout";
import Overview from "./components/Overview";
import MoviesInsight from "./components/MoviesInsight";
import GenreAnalytics from "./components/GenreAnalytics";
import AudienceDemo from "./components/AudienceDemo";
import GeographicInsights from "./components/GeographicInsights";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { index: true, Component: Overview },
      { path: "movies", Component: MoviesInsight },
      { path: "genres", Component: GenreAnalytics },
      { path: "audience", Component: AudienceDemo },
      { path: "geographic", Component: GeographicInsights },
    ],
  },
]);
