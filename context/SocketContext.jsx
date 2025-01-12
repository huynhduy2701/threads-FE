// Nhập các hàm createContext, useEffect và useState từ thư viện react
import { createContext, useEffect, useState } from "react";
// Nhập hàm useRecoilValue từ thư viện recoil
import { useRecoilValue } from "recoil";
// Nhập hàm io từ thư viện socket.io-client
import io from "socket.io-client";
// Nhập atom userAtom từ thư mục src/atoms
import userAtom from "../src/atoms/userAtom";

// Tạo một context mới cho Socket
const SocketContext = createContext();

// Tạo một hook để sử dụng SocketContext
export const useSocket = () => {
    return useContext(SocketContext);
}

// Tạo một component provider cho SocketContext
export const SocketContextProvider = ({children}) =>{
    // Khai báo state socket và hàm setSocket để cập nhật state
    const [socket,setSocket] = useState(null);
    // Lấy giá trị của user từ recoil state
    const user = useRecoilValue(userAtom);

    // Sử dụng useEffect để kết nối socket khi component được mount và ngắt kết nối khi component bị unmount
    useEffect(() => {
      // Kết nối tới server socket.io tại địa chỉ http://localhost:5000 và gửi userID trong query
      const newSocket = io("http://localhost:5500", {
        query: {
          userID: user?._id,
        },
      });
      // Cập nhật state socket
      setSocket(newSocket);
      // Ngắt kết nối socket khi component bị unmount
      return () => newSocket && newSocket.close();
    }, [ user?._id]);

    // Trả về provider của SocketContext với giá trị là socket và bọc các children bên trong
    return <SocketContext.Provider value={{socket}}>{children}</SocketContext.Provider>
};