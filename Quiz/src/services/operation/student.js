import { toast } from "react-toastify";
import { apiConnector } from "../connector";


export async function fetchStudentDashboard(setLoading,setData) {

    setLoading(true);

    try {
        const response = await apiConnector("GET", `http://localhost:3000/api/v1/studentdash`);

    if (!response.data.success) {
        throw new Error(response.data.message);
    }

    setData(response.data.quizhistorydata);

    } catch (error) {
        toast.error(error.message);
        console.error('Error fetching Student details:', error);
    }
    setLoading(false);
  }