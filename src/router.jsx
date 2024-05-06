import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bpmn from "./bpmn/bpmn";
import Dmn from "./dmn";
import Demo from "./bpmn/demo";

const NotFound = () => {
  return <h1>404: Page Not Found</h1>;
};

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Bpmn />} />
          <Route path="/dmn" element={<Dmn />} />
          <Route path="/demo" element={<Demo />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
