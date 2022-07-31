import React, { useCallback, useState } from "react";
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
  Form,
  FormGroup,
  Input,
  Label,
  Col,
  FormFeedback,
} from "reactstrap";
import { Link } from "react-router-dom";

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

const Home = () => {
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
  const [staffs, setStaffs] = useState(
    localStorage.getItem("listStaffs")
      ? JSON.parse(localStorage.getItem("listStaffs"))
      : [...STAFFS]
  );
  const [errors, setErrors] = useState(initialErrors);

  const handleChangeSearch = (e) => {
    setInputSearch(e.target.value);
  };
  const handleBlur = () => {
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
    if (newStaff.name && newStaff.name.length < 3)
      errors.name = "Name should be >= 3 characters";

    if (newStaff.name && newStaff.name.length > 15)
      errors.name = "Name should be <15 characters";

    if (newStaff.salaryScale && !isDecimal.test(newStaff.salaryScale))
      errors.salaryScale = "salaryScale should contain only numbers";

    if (newStaff.annualLeave && !reg.test(newStaff.annualLeave))
      errors.annualLeave = "annualLeave should contain only numbers";

    if (newStaff.overTime && !reg.test(newStaff.overTime)) {
      errors.overTime = "salaryScale should contain only numbers";
    }

    return setErrors(errors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "department") {
      setNewStaff({
        ...newStaff,
        department: departments.find((d) => d.name === value),
        id: staffs.length,
      });
    } else {
      setNewStaff({
        ...newStaff,
        [name]: value,
        id: staffs.length,
      });
    }
  };

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

  const handleSubmitSearch = () => {
    if (inputSearch === "") {
      alert("vui lòng nhập tên nhân viên");
    }

    const searchStaffs = staffs.filter((item) =>
      item.name.toLowerCase().includes(inputSearch.toLowerCase())
    );

    setStaffs(searchStaffs);
    setInputSearch("");
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
          <Form>
            <FormGroup row>
              <Label htmlFor="name " sm={4}>
                Tên
              </Label>
              <Col sm={8}>
                <Input
                  type="text"
                  name="name"
                  invalid={errors.name !== ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={newStaff.name}
                />
                <FormFeedback>{errors.name}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="doB " sm={4}>
                Ngày sinh
              </Label>
              <Col sm={8}>
                <Input
                  type="date"
                  id="doB"
                  name="doB"
                  invalid={errors.doB !== ""}
                  value={newStaff.doB}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormFeedback>{errors.doB}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="startDate " sm={4}>
                Ngày vào công ty
              </Label>
              <Col sm={8}>
                <Input
                  type="date"
                  id="startDate"
                  name="startDate"
                  invalid={errors.startDate !== ""}
                  onChange={handleChange}
                  value={newStaff.startDate}
                />
                <FormFeedback>{errors.startDate}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="department " sm={4}>
                phòng ban
              </Label>
              <Col sm={8}>
                <Input
                  type="select"
                  id="department"
                  name="department"
                  onChange={handleChange}
                  value={newStaff.department.name}
                >
                  <option value="Sale">Sale</option>
                  <option value="HR">HR</option>
                  <option value="Marketing">Marketing</option>
                  <option value="IT">IT</option>
                  <option value="Finance">Finance</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="salaryScale " sm={4}>
                hệ số lương
              </Label>
              <Col sm={8}>
                <Input
                  type="text"
                  id="salaryScale"
                  name="salaryScale"
                  placeholder="1.0->3.0"
                  invalid={errors.salaryScale !== ""}
                  onChange={handleChange}
                  value={newStaff.salaryScale}
                  onBlur={handleBlur}
                />
                <FormFeedback>{errors.salaryScale}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="annualLeave " sm={4}>
                Số ngày nghỉ còn lại
              </Label>
              <Col sm={8}>
                <Input
                  type="text"
                  id="annualLeave"
                  name="annualLeave"
                  invalid={errors.annualLeave !== ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={newStaff.annualLeave}
                />
                <FormFeedback>{errors.annualLeave}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="overTime " sm={4}>
                Số ngày đã làm thêm
              </Label>
              <Col sm={8}>
                <Input
                  type="text"
                  id="overTime"
                  name="overTime"
                  invalid={errors.overTime !== ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={newStaff.overTime}
                />
                <FormFeedback>{errors.overTime}</FormFeedback>
              </Col>
            </FormGroup>

            <Button color="primary" onClick={handleSubmitForm}>
              Thêm
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default Home;
