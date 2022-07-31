import React, { useState } from "react";
import { Card } from "reactstrap";
import { DEPARTMENTS, STAFFS } from "../shared/staffs";
import { Link } from "react-router-dom";

const Department = () => {
  const staffs = localStorage.getItem("listStaffs")
    ? JSON.parse(localStorage.getItem("listStaffs"))
    : [...STAFFS];
  const [departments, setDepartments] = useState([...DEPARTMENTS]);
  console.log(staffs);
  console.log(departments);
  const newDepartments = departments.forEach((d) => {
    d.numberOfStaff = staffs.filter(
      (item) => item.department.name === d.name
    ).length;
  });
  console.log(departments);
  return (
    <div className="container">
      <div className="px-4 row">
        {departments &&
          departments.length > 0 &&
          departments.map((item) => (
            <div className="col-12 col-lg-4 col-md-6 py-2 px-2">
              <Link to={`department/${item.name}`}>
                <Card key={item.id} className="p-2 mt-2">
                  <h3 className="text-dark">{item.name}</h3>
                  <p className="text-dark">
                    Số lượng nhân viên: {item.numberOfStaff}
                  </p>
                </Card>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Department;
