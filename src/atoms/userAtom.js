// import { atom } from "recoil";

// const userAtom = atom({
//   key: "userAtom",
//   default: JSON.parse(localStorage.getItem("user-threads")), // Nếu không có dữ liệu, trả về null
// });

// export default userAtom;
import { atom } from "recoil";

const userAtom = atom({
  key: "userAtom",
  default: (() => {
    try {
      const storedUser = localStorage.getItem("user-threads");
      return storedUser ? JSON.parse(storedUser) : null; // Trả về null nếu không có dữ liệu
    } catch (error) {
      console.error("Lỗi phân tích JSON từ localStorage:", error);
      return null; // Trả về null nếu gặp lỗi
    }
  })(),
});

export default userAtom;
