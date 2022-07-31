import { firstActionConstant } from "./constant";
import { addStaffConstant } from "./constant";

export const firstAction = {
  getNumber: () => ({
    type: firstActionConstant,
    payload: "helloWorld",
  }),
};

export const addStaffs = (staffs) => ({
  type: addStaffConstant,
  payload: staffs,
});
