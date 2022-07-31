import { STAFFS } from "../shared/staffs";
import { DEPARTMENTS } from "../shared/staffs";
import { firstActionConstant } from "./constant";
import { addStaffConstant } from "./constant";

export const initialState = {
  staffs: localStorage.getItem("listStaffs")
    ? JSON.parse(localStorage.getItem("listStaffs"))
    : [...STAFFS],
  department: [...DEPARTMENTS],
  tetx: "",
};

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case firstActionConstant: {
      // gán state.text = 'helloworld'; 'helloWorld' là giá trọ truyền vào từ action
      // check lại action.js để biết payload
      return {
        ...state,
        text: action.payload,
      };
    }
    case addStaffConstant: {
      return {
        ...state,

        staffs: action.payload,
      };
    }

    default:
      return state; // luôn phải trả ra trị default trong switch case
  }
};
