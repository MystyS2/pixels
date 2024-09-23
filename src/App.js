import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AppLayout from "./layout/AppLayout";
import CreatorListPage from "./pages/CreatorListPage";
import CreatorDetailPage from "./pages/CreatorDetailPage";
import NewsPage from "./pages/NewsPage";
import NotFoundPage from "./pages/NotFoundPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="creators" index element={<CreatorListPage />} />
        <Route path="creators/:type/:id" element={<CreatorDetailPage />} />
        <Route path="news" index element={<NewsPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
