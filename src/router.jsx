import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./bpmn";
import Dmn from "./dmn";
import Start from "./demo/start";
import Review from "./demo/review";
import Result from "./demo/result";

const NotFound = () => {
  return <h1>404: Page Not Found</h1>;
};

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dmn" element={<Dmn />} />
          <Route path="/demo" element={<Start />} />
          <Route path="/review" element={<Review />} />
          <Route path="/result" element={<Result />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
