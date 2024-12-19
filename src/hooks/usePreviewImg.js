import  { useState } from 'react'
import useShowToast from './useShowToast';

const usePreviewImg = () => {
  const [imgUrl, setImgUrl] = useState(null);
  const showToast = useShowToast();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(">>>check file in handleImageChange: ", file);
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImgUrl(reader.result);
      };

      reader.readAsDataURL(file);
      showToast("Tải ảnh", "Tải ảnh thành công", "success");
      
    } else {
      showToast(
        "Lỗi tải ảnh",
        "Lỗi tải lên hình ảnh vui lòng chọn lại ảnh",
        "error"
      );
      setImgUrl(null);
    }
  };
  // console.log(">>>check imgUrl in handleImageChange :", imgUrl);

  return { handleImageChange, imgUrl, setImgUrl };
};

export default usePreviewImg
