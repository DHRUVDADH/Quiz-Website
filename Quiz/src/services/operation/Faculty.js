import { toast } from "react-toastify";
import { apiConnector } from "../connector";
import { endpoints } from "../api";


export async function fetchDetaildResult(resultID ,setLoading,setData) {

    setLoading(true);
  
    try {
      const response = await apiConnector("GET", `http://localhost:3000/api/v1/submitquizdetail?resultID=${resultID}`);
  
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      setData(response.data);
      console.log(response.data)
     
    } catch (error) {
      toast.error(error.message);
      console.error('Error fetching quiz details:', error);
    }
    setLoading(false);
  }