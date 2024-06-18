import { toast } from "react-toastify";
import { apiConnector } from "../connector";
import { endpoints } from "../api";



export async function careteQuiz(title , durationInMins , noOfQuestion , totalmarks , description , date , time , subId , subName , setLoading ,setCodeModal ) {

  const toastId = toast.loading("Loading...");
  setLoading(true);

  try {
    const response = await apiConnector("POST", endpoints.CREATE_QUIZ, {  title , durationInMins , noOfQuestion , totalmarks , description , date , time , subId , subName});
    console.log(response)
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    setCodeModal(true);

  } catch (error) {

    console.log("SignUp API ERROR............", error);
    toast.error(error.message);
  }

  setLoading(false);
  toast.dismiss(toastId);
}
