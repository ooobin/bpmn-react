import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./bpmn-js";
import Tracer from "./bpmn-js/process-trace";
import Form from "./form-js";
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
          <Route path="/form" element={<Form />} />
          <Route path="/tracer" element={<Tracer />} />
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
