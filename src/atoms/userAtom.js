import { atom } from "recoil";

const userAtom = atom({
  key: "userAtom",
  default: JSON.parse(localStorage.getItem("user-threads")) || null, // Nếu không có dữ liệu, trả về null
});

export default userAtom;