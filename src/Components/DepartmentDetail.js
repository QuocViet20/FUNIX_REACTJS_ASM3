import React from "react";
import {
  CardBody,
  Card,
  CardImg,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { DEPARTMENTS, STAFFS } from "../shared/staffs";

function RenderStaff({ staff }) {
  return (
    <Card>
      <Link to={`/staff/${staff.id}`}>
        <CardBody>
          <CardImg width="100%" src={staff.image} alt={staff.name} />
        </CardBody>
      </Link>
      <div>
        <CardTitle className="text-center text-dark ">{staff.name}</CardTitle>
      </div>
    </Card>
  );
}

function RenderDepartmentDetail({ department }) {
  return (
    <div className="row">
      {department &&
        department.map((staff) => (
          <div key={staff.id} className="col-6 col-lg-2 col-md-4 my-2">
            <RenderStaff staff={staff} />
          </div>
        ))}
    </div>
  );
}

const DepartmentDetail = ({ departmentName }) => {
  const staffs = localStorage.getItem("listStaffs")
    ? JSON.parse(localStorage.getItem("listStaffs"))
    : [...STAFFS];
  // const filterStaffs = staffs.filter((d) => {
  //   if (d.department) {
  //     return d;
  //   }
  // });
  // localStorage.setItem("listStaffs", JSON.stringify(filterStaffs));
  // console.log(filterStaffs);
  // // console.log(departmentName);
  // console.log(
  //   filterStaffs.filter((staff) => staff.department.name === departmentName)
  // );
  const newDepartment = staffs.filter(
    (d) => d.department.name == departmentName
  );
  console.log(newDepartment);

  return (
    <div className="container">
      <div className="mx-4">
        <div className="row mt-2 border-bottom ">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/department">Phòng Ban</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active className="text-dark">
              {departmentName}
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <RenderDepartmentDetail department={newDepartment} />
      </div>
    </div>
  );
};
export default DepartmentDetail;
