import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Đây là phần cấu hình máy chủ phát triển (development server) cho dự án.
  server: {
    port: 3000, //Máy chủ phát triển của Vite sẽ chạy trên cổng 3000. Điều này có nghĩa khi bạn khởi động dự án, bạn sẽ truy cập nó thông qua địa chỉ http://localhost:3000
    // get rid of the cors error
    //Được dùng để thiết lập proxy, giúp chuyển tiếp các yêu cầu từ cổng của máy chủ phát triển Vite (3000) đến một cổng khác (5000 trong trường hợp này). Điều này rất hữu ích khi bạn đang phát triển frontend (React) và backend (Express hoặc bất kỳ API nào) cùng lúc mà chúng chạy trên các cổng khác nhau.
    proxy: {
      // Bất kỳ yêu cầu nào được gửi tới đường dẫn /api trên cổng 3000 sẽ được chuyển tiếp đến http://localhost:5000/api. Điều này giúp tránh các vấn đề liên quan đến CORS khi bạn phát triển ứng dụng.
      "/api": {
        // target: "http://localhost:5000", //Đây là đích mà các yêu cầu /api sẽ được chuyển tiếp tới. Ở đây, nó chuyển tiếp tới http://localhost:5000, nơi có thể là máy chủ backend của bạn (chẳng hạn Node.js hoặc Express).
        target: "https://threads-be.onrender.com", //Đây là đích mà các yêu cầu /api sẽ được chuyển tiếp tới. Ở đây, nó chuyển tiếp tới http://localhost:5000, nơi có thể là máy chủ backend của bạn (chẳng hạn Node.js hoặc Express).
        changeOrigin: true, //Đảm bảo rằng tiêu đề Host của yêu cầu sẽ được thay đổi thành mục tiêu của proxy (localhost:5000).
        secure: false, //Chỉ định rằng proxy có thể gửi yêu cầu đến các máy chủ không bảo mật (không sử dụng HTTPS). Điều này hữu ích trong môi trường phát triển.
      },
    },
  },
});
