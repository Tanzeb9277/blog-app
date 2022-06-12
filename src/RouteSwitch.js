import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import PostPage from "./PostPage";

const RouteSwitch = () => {
  return (
    <BrowserRouter basename='/blog-app'>
      <Routes>
        <Route path="/" exact element={<App />} />
        <Route path="/posts/:postid" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;