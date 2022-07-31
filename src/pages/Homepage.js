import React, { useEffect, useState } from "react";
import { DEPARTMENTS, STAFFS } from "../shared/staffs";
import {
  Card,
  CardBody,
  CardTitle,
  CardImg,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Col,
  Row,
} from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { Control, LocalForm, Errors } from "react-redux-form";

import { addStaffs } from "../redux/action";

const mapStateToProps = (state) => {
  return {
    staffs: state.firstReducer.staffs,
    firstReducer: state.firstReducer,
  };
};

// const mapDispatchToProps = (dispatch) => ({
//   addStaffDispatch: () => dispatch(addStaffs.handleSubmit()),
//   // dispatch dùng để dẫn đến action
// });
const mapDispatch = {
  addStaffs,
};
function RenderStaff({ staff }) {
  return (
    <Card>
      <Link to={`staff/${staff.id}`}>
        <CardBody>
          <CardImg width="100%" src={staff.image} alt={staff?.name} />
        </CardBody>
      </Link>
      <div>
        <CardTitle className="text-center text-dark ">{staff?.name}</CardTitle>
      </div>
    </Card>
  );
}

const Home = (props) => {
  console.log(props);
  const [departments, setDepartment] = useState([...DEPARTMENTS]);

  const initialStaff = {
    name: "",
    doB: "",
    salaryScale: "1",
    startDate: "",
    department: departments[0],
    annualLeave: "0",
    overTime: "0",
    salary: "",
    image: "/assets/images/alberto.png",
  };

  const initialErrors = {
    name: "",
    doB: "",
    startDate: "",
    salaryScale: "",
    annualLeave: "",
    overTime: "",
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [newStaff, setNewStaff] = useState(initialStaff);
  const [inputSearch, setInputSearch] = useState("");
  const [staffs, setStaffs] = useState(props.staffs);
  const [errors, setErrors] = useState(initialErrors);

  useEffect(() => {
    const listStaffs = JSON.parse(localStorage.getItem("listStaffs"));
    if (listStaffs && listStaffs.length > 0) {
      setStaffs(listStaffs);
    }
  }, []);

  const dispatch = useDispatch();

  // const handleBlur = () => {
  //   const errors = {
  //     name: "",
  //     doB: "",
  //     startDate: "",
  //     salaryScale: "",
  //     annualLeave: "",
  //     overTime: "",
  //   };
  //   const reg = /^\d+$/;
  //   const isDecimal = /^[+-]?((\d+(\.\d*)?)|(\.\d+))$/;
  //   if (newStaff.name && newStaff.name.length < 3)
  //     errors.name = "Name should be >= 3 characters";

  //   if (newStaff.name && newStaff.name.length > 15)
  //     errors.name = "Name should be <15 characters";

  //   if (newStaff.salaryScale && !isDecimal.test(newStaff.salaryScale))
  //     errors.salaryScale = "salaryScale should contain only numbers";

  //   if (newStaff.annualLeave && !reg.test(newStaff.annualLeave))
  //     errors.annualLeave = "annualLeave should contain only numbers";

  //   if (newStaff.overTime && !reg.test(newStaff.overTime)) {
  //     errors.overTime = "salaryScale should contain only numbers";
  //   }

  //   return setErrors(errors);
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   if (name === "department") {
  //     setNewStaff({
  //       ...newStaff,
  //       department: departments.find((d) => d.name === value),
  //       id: staffs.length,
  //     });
  //   } else {
  //     setNewStaff({
  //       ...newStaff,
  //       [name]: value,
  //       id: staffs.length,
  //     });
  //   }
  // };

  // validate form redux-form
  const required = (val) => val && val.length;
  const maxLength = (len) => (val) => !val || val.length <= len;
  const minLength = (len) => (val) => val && val.length >= len;
  const isNumber = (val) => !isNaN(Number(val));
  const isDecimal = (val) => /^[+-]?((\d+(\.\d*)?)|(\.\d+))$/i.test(val);

  const handleSubmitForm = () => {
    const errors = {
      name: "",
      doB: "",
      startDate: "",
      salaryScale: "",
      annualLeave: "",
      overTime: "",
    };
    const reg = /^\d+$/;
    const isDecimal = /^[+-]?((\d+(\.\d*)?)|(\.\d+))$/;

    if (!newStaff.name) {
      errors.name = "please input for name";
      setModalOpen(true);
      setErrors(errors);
    }
    if (!newStaff.doB) {
      errors.doB = "please input for birthday";
      setModalOpen(true);
      setErrors(errors);
    }
    if (!newStaff.startDate) {
      errors.startDate = "please input for startDate";
      setModalOpen(true);
      setErrors(errors);
    } else if (newStaff.salaryScale && !isDecimal.test(newStaff.salaryScale)) {
      errors.salaryScale = "salaryScale should contain only numbers";
      setModalOpen(true);
      setErrors(errors);
    } else if (newStaff.annualLeave && !reg.test(newStaff.annualLeave)) {
      errors.annualLeave = "annualLeave should contain only numbers";
      setModalOpen(true);
      setErrors(errors);
    } else if (newStaff.overTime && !reg.test(newStaff.overTime)) {
      errors.overTime = "salaryScale should contain only numbers";
      setModalOpen(true);
      setErrors(errors);
    } else {
      const newListStaffs = [...staffs];
      newListStaffs.push(newStaff);
      setStaffs(newListStaffs);
      setNewStaff(initialStaff);
      setErrors(initialErrors);
      localStorage.setItem("listStaffs", JSON.stringify(newListStaffs));
      setModalOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmitSearch();
  };

  const handleChangeSearch = (e) => {
    setInputSearch(e.target.value);
  };

  const handleSubmitSearch = () => {
    if (inputSearch === "") {
      alert("vui lòng nhập tên nhân viên");
    }

    const searchStaffs = props.staffs.filter((item) =>
      item.name.toLowerCase().includes(inputSearch.toLowerCase())
    );
    setStaffs(searchStaffs);
    setInputSearch("");
  };
  const handleSubmit = (values) => {
    newStaff.name = values.name;
    newStaff.doB = values.doB;
    newStaff.startDate = values.startDate;
    if (!values.select) {
      newStaff.department = departments[0];
    } else {
      newStaff.department = departments.find((d) => d.name === values.select);
    }
    newStaff.salaryScale = values.salaryScale;
    newStaff.annualLeave = values.annualLeave;
    newStaff.overTime = values.overTime;
    newStaff.id = staffs.length + 1;
    setNewStaff({ ...newStaff });
    const newListStaffs = [...staffs];
    newListStaffs.push(newStaff);

    dispatch(addStaffs(newListStaffs));

    setStaffs(newListStaffs);
    setNewStaff(initialStaff);

    localStorage.setItem("listStaffs", JSON.stringify(newListStaffs));
    setModalOpen(false);
  };

  const menu = staffs.map((staff) => {
    return (
      <div key={staff.id} className="col-6 col-lg-2 col-md-4 my-2">
        <RenderStaff staff={staff} />
      </div>
    );
  });

  return (
    <div className="container">
      <div className="mx-4">
        <div className="my-2 border-bottom mb-2 d-flex row ">
          <h2 className="mb-2">Nhân Viên</h2>
          <div className="row container-fluid ">
            <div className="col-auto col-sm-12  col-lg-2">
              <Button
                onClick={() => setModalOpen(!modalOpen)}
                className="btn  btn-secondary mb-3 "
              >
                Thêm mới
              </Button>
            </div>
            <div className="col-12 col-sm-8 col-lg-6">
              <input
                type="text"
                className="form-control"
                onChange={handleChangeSearch}
                placeholder="Nhập tên nhân viên"
                value={inputSearch}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="col-auto col-sm-3 col-lg-3">
              <button
                type="submit"
                onClick={handleSubmitSearch}
                className="btn btn-primary mb-3 "
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
        <div className="row">{menu}</div>
      </div>
      <Modal
        isOpen={modalOpen}
        toggle={() => {
          setModalOpen(!modalOpen);
          setNewStaff(initialStaff);
        }}
      >
        <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
          Thêm Nhân Viên
        </ModalHeader>
        <ModalBody>
          <LocalForm onSubmit={(values) => handleSubmit(values)}>
            <Row className="form-group my-2">
              <Label htmlFor="name " sm={4}>
                Tên
              </Label>
              <Col sm={8}>
                <Control.text
                  model=".name"
                  name="name"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".name"
                  show="touched"
                  messages={{
                    required: "Required ",
                    minLength: "Must be greater than 2 characters",
                    maxLength: "Must be 15 characters or less",
                  }}
                />
              </Col>
            </Row>
            <Row className="form-group my-2">
              <Label htmlFor="doB " sm={4}>
                Ngày sinh
              </Label>
              <Col sm={8}>
                <Control
                  model=".doB"
                  type="date"
                  id="doB"
                  name="doB"
                  className="form-control"
                  validators={{
                    required,
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".doB"
                  show="touched"
                  messages={{
                    required: "Required",
                    minLength: "Must be greater than 2 characters",
                    maxLength: "Must be 15 characters or less",
                  }}
                />
              </Col>
            </Row>
            <Row className="form-group my-2">
              <Label htmlFor="startDate " sm={4}>
                Ngày vào công ty
              </Label>
              <Col sm={8}>
                <Control
                  model=".startDate"
                  type="date"
                  id="startDate"
                  name="startDate"
                  className="form-control"
                  validators={{
                    required,
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".startDate"
                  show="touched"
                  messages={{
                    required: "Required",
                    minLength: "Must be greater than 2 characters",
                    maxLength: "Must be 15 characters or less",
                  }}
                />
              </Col>
            </Row>
            <Row className="form-group my-2">
              <Label htmlFor="department " sm={4}>
                phòng ban
              </Label>
              <Col sm={8}>
                <Control.select
                  model=".select"
                  id="department"
                  name="department"
                  className="form-control"
                >
                  <option value="Sale">Sale</option>
                  <option value="HR">HR</option>
                  <option value="Marketing">Marketing</option>
                  <option value="IT">IT</option>
                  <option value="Finance">Finance</option>
                </Control.select>
              </Col>
            </Row>
            <Row className="form-group my-2">
              <Label htmlFor="salaryScale " sm={4}>
                hệ số lương
              </Label>
              <Col sm={8}>
                <Control.text
                  model=".salaryScale"
                  id="salaryScale"
                  name="salaryScale"
                  placeholder="1.0->3.0"
                  className="form-control"
                  validators={{
                    required,
                    isDecimal,
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".salaryScale"
                  show="touched"
                  messages={{
                    required: "Required",
                    minLength: "Must be greater than 2 characters",
                    maxLength: "Must be 15 characters or less",
                    isDecimal: "Must be a number",
                  }}
                />
              </Col>
            </Row>
            <Row className="form-group my-2">
              <Label htmlFor="annualLeave " sm={4}>
                Số ngày nghỉ còn lại
              </Label>
              <Col sm={8}>
                <Control.text
                  model=".annualLeave"
                  id="annualLeave"
                  name="annualLeave"
                  className="form-control"
                  validators={{
                    required,
                    isNumber,
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".annualLeave"
                  show="touched"
                  messages={{
                    required: "Required",
                    minLength: "Must be greater than 2 characters",
                    maxLength: "Must be 15 characters or less",
                    isNumber: "Must be a number",
                  }}
                />
              </Col>
            </Row>
            <Row className="form-group my-2">
              <Label htmlFor="overTime " sm={4}>
                Số ngày đã làm thêm
              </Label>
              <Col sm={8}>
                <Control.text
                  model=".overTime"
                  id="overTime"
                  name="overTime"
                  className="form-control"
                  validators={{
                    required,
                    isNumber,
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".overTime"
                  show="touched"
                  messages={{
                    required: "Required ",
                    minLength: "Must be greater than 2 characters",
                    maxLength: "Must be 15 characters or less",
                    isNumber: "Must be a number",
                  }}
                />
              </Col>
            </Row>

            <Button color="primary">Thêm</Button>
          </LocalForm>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default withRouter(connect(mapStateToProps, mapDispatch)(Home));
