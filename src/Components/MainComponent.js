import React, { useState } from "react";
import Home from "../pages/Homepage.js";
import StaffDetail from "./StaffDetail";
import DepartmentDetail from "./DepartmentDetail";
import Department from "../pages/DepartmentPage";
import Salary from "../pages/SalaryPage";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";

const Main = () => {
  const StaffWithId = ({ match }) => {
    console.log(match);
    return <StaffDetail id={parseInt(match.params.staffId, 10)} />;
  };

  const DepartmentFilter = ({ match }) => {
    console.log(match);

    return <DepartmentDetail departmentName={match.params.departmentId} />;
  };

  return (
    <div>
      <Header />
      <Switch>
        <Route path="/home" component={() => <Home />} />
        <Route exact path="/department" component={Department} />
        <Route exact path="/salary" component={() => <Salary />} />
        <Route path="/staff/:staffId" component={StaffWithId} />
        <Route path="/department/:departmentId" component={DepartmentFilter} />
        <Route
          exact
          path="/department/staff/:staffId"
          component={StaffWithId}
        />
        <Redirect to="/home" />
      </Switch>
      <Footer />
    </div>
  );
};

export default Main;
