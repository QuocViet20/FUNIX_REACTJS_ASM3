import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { STAFFS } from "../shared/staffs";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    staffs: state.firstReducer.staffs,
    firstReducer: state.firstReducer,
  };
};

const Salary = (props) => {
  const [sortStaffs, setSortStaffs] = useState(props.staffs);
  const [selectSort, setSelectSort] = useState("");
  const [inputSearch, setInputSearch] = useState("");

  const handleChange = (e) => {
    setSelectSort(e.target.value);
    const selectedSort = e.target.value;

    if (selectedSort === "1") {
      const tempt = sortStaffs.sort((a, b) =>
        a.id > b.id ? 1 : a.id < b.id ? -1 : 1
      );
      setSortStaffs(tempt);
    }
    if (selectedSort === "2") {
      const tempt = sortStaffs.sort((a, b) =>
        a.salaryScale > b.salaryScale
          ? 1
          : a.salaryScale < b.salaryScale
          ? -1
          : 1
      );
      setSortStaffs(tempt);
    }
    if (selectedSort === "3") {
      const tempt = sortStaffs.sort((a, b) =>
        a.overTime > b.overTime ? 1 : a.overTime < b.overTime ? -1 : 0
      );
      setSortStaffs(tempt);
    }
    if (selectedSort === "4") {
      const tempt = sortStaffs.sort((a, b) =>
        a.salaryScale * 300000 + a.overTime * 200000 >
        b.salaryScale * 300000 + b.overTime * 200000
          ? 1
          : a.salaryScale * 300000 + a.overTime * 200000 <
            b.salaryScale * 300000 + b.overTime * 200000
          ? -1
          : 1
      );
      setSortStaffs(tempt);
    }
  };

  const handleChangeSearch = (e) => {
    setInputSearch(e.target.value);
  };
  const handleSubmit = () => {
    if (inputSearch === "") {
      alert("vui lòng nhập tên nhân viên cần tìm kiếm");
    }
    const tempt = sortStaffs.filter((item) =>
      item.name.toLowerCase().includes(inputSearch.toLowerCase())
    );
    setSortStaffs(tempt);
    setInputSearch("");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className=" container">
      <div className="row mx-4">
        <div className=" col-12 row mt-2 border-bottom d-flex justify-content ">
          <div className="col-12 col-sm-8 col-lg-6  mt-2">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/home" className=" ">
                  Nhân Viên
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem active className="text-dark">
                Bảng Lương
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div className="col-12 col-sm-7 col-lg-6 row d-flex align-items-center">
            <div className=" col-sm-3 col-lg-3 align-items-right ">
              <p className="text-danger text-right ">Sắp xếp</p>
            </div>
            <div className=" col-sm-9 col-lg-9 ">
              <select
                class="form-select form-select-lg mb-3"
                aria-label=".form-select-lg example"
                onChange={handleChange}
                value={selectSort}
              >
                <option value="1" selected>
                  theo mã nhân viên
                </option>
                <option value="2">theo hệ số lương</option>
                <option value="3">theo số ngày làm thêm</option>
                <option value="4">theo lương</option>
              </select>
            </div>
          </div>
          <div className="row col-12 col-sm-12 col-lg-6 mt-1 d-flex">
            <div class="col-12 col-sm-8">
              <input
                type="text"
                class="form-control"
                onChange={handleChangeSearch}
                placeholder="Nhập tên nhân viên"
                value={inputSearch}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div class="col-auto ">
              <button
                type="submit"
                onClick={handleSubmit}
                class="btn btn-primary mb-3"
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
        {sortStaffs.length > 0 &&
          sortStaffs.map((item) => (
            <div className="col-12 col-sm-6 col-lg-4 p-2">
              <Card key={item.id} className="px-4 pt-2">
                <h3>{item.name}</h3>
                <p>Mã nhân viên: {item.id}</p>
                <p>Hệ số lương: {item.salaryScale}</p>
                <p>Số ngày làm thêm: {item.overTime}</p>
                <CardBody className="bg-light">
                  <CardTitle className="bg-light px-4">
                    Lương: {item.salaryScale * 300000 + item.overTime * 200000}
                  </CardTitle>
                </CardBody>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
};
export default withRouter(connect(mapStateToProps)(Salary));
