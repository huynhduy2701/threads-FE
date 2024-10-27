import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";


const useShowToast = () => {
  const toast = useToast();
    const showToast = useCallback((title,description,status)=>{
        toast({
          title: title,
          description: description,
          position: "top",
          status: status,
          isClosable: true,
          duration: 3000,
          isClosable: true,
        });
    },[toast]);
  return showToast;
}

export default useShowToast