import { useToast } from "@chakra-ui/react";


const useShowToast = () => {
  const toast = useToast();
    const showToast = (title,description,status)=>{
        toast({
          title: title,
          description: description,
          position: "top",
          status: status,
          isClosable: true,
          duration: 3000,
          isClosable: true,
        });
    };
  return showToast;
}

export default useShowToast