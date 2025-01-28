// Nhập StrictMode từ thư viện react
import { StrictMode } from "react";
// Nhập hàm createRoot từ thư viện react-dom/client
import { createRoot } from "react-dom/client";
// Nhập component App
import App from "./App.jsx";
// Nhập file CSS
import "./index.css";
// Nhập các thành phần từ thư viện @chakra-ui/react
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
// Nhập hàm mode từ @chakra-ui/theme-tools
import { mode } from "@chakra-ui/theme-tools";
// Nhập BrowserRouter từ thư viện react-router-dom
import { BrowserRouter } from "react-router-dom";
// Nhập RecoilRoot từ thư viện recoil
import { RecoilRoot } from "recoil";
import { SocketContextProvider } from "./context/SocketContext.jsx";
// Nhập SocketContextProvider từ context


// Định nghĩa các styles toàn cục
const styles = {
  global: (props) => ({
    body: {
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("gray.100", "#101010")(props),
    },
  }),
};

// Cấu hình chế độ màu
const config = {
  initiaColorMode: "dark",
  useSystemColorMode: true,
};

// Định nghĩa các màu sắc
const colors = {
  gray: {
    light: "#616161",
    dark: "#1e1e1e",
  },
};

// Tạo theme bằng cách mở rộng theme mặc định của Chakra UI
const theme = extendTheme({ config, styles, colors });

// Tạo root và render ứng dụng
createRoot(document.getElementById("root")).render(
  // StrictMode render mỗi component hai lần
  <StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <SocketContextProvider>
            <App />
          </SocketContextProvider>
        </ChakraProvider>
      </BrowserRouter>
    </RecoilRoot>
  </StrictMode>
);
