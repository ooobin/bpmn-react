import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bpmn from "./bpmn/bpmn";
import Demo from "./bpmn/demo";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Bpmn />} />
          <Route path="/demo" element={<Demo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
