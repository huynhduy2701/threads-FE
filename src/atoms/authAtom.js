// import {atom} from 'recoil'
// const authScreenAtom = atom({
//     key: 'authScreenAtom',
//     default: 'login',
  
// })
// export default authScreenAtom;
import { atom } from "recoil";

// Quản lý trạng thái màn hình xác thực (login, signup)
const authScreenAtom = atom({
  key: "authScreenAtom",
  default: "login", // Giá trị mặc định là login
});

// Quản lý trạng thái người dùng (đã đăng nhập hay chưa)
const authStateAtom = atom({
  key: "authStateAtom",
  default: {
    isAuthenticated: false, // Người dùng chưa đăng nhập
    user: null, // Không có thông tin người dùng
  },
});

export { authScreenAtom, authStateAtom };