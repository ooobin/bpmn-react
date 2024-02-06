import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import PageStructure from "../pages/page-structure";
import Bpmn from "../pages/home/bpmn/bpmn";
import Result_404 from "../pages/result/result-404";
import SignIn from "../pages/home/sign-in/sign-in.tsx"
import SignInSide from "../pages/home/sign-in/sign-in-side.tsx";

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact render={() => <Redirect to="/home" />} />
                    <Route path="/home" component={PageStructure} />
                    <Route path="/bpmn" exact component={Bpmn} />
                    <Route path="/sign-in" exact component={SignIn} />
                    <Route path="/sign-in-side" exact component={SignInSide} />
                    <Route path="*" component={Result_404} />
                </Switch>
            </BrowserRouter>
        </>
    );
};

export default Router;
