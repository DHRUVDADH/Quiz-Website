import { toast } from "react-toastify";
import { apiConnector } from "../connector";
import { setToken, setUser } from "../../slices/profile";
import Cookies from "js-cookie";
import { endpoints } from "../api";



export async function signUp( firstname, lastname, usertype, student_id, password, email,setLoading, navigate) {

  const toastId = toast.loading("Loading...");
  setLoading(true);

  try {
    const response = await apiConnector("POST", endpoints.SIGNUP_API, { firstname, lastname, usertype, student_id, password, email, });
    console.log(response)
    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Signup Success");
    navigate("/login");

  } catch (error) {

    console.log("SignUp API ERROR............", error);
    toast.error(error.message);
  }

  setLoading(false);
  toast.dismiss(toastId);
}


export function login(email, password, setLoading , navigate , dispatch) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    setLoading(true);
    try {
      const response = await apiConnector(
        "POST",
        endpoints.LOGIN_API,
        { email, password }
      );
      console.log("LOGIN API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Login Successful");
      dispatch(setToken(response.data.token));
      dispatch(setUser({ ...response.data.user }));

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      navigate("/tutor");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error(error.message);
    }
    setLoading(false);
    toast.dismiss(toastId);
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    Cookies.remove("token");
    navigate("/");
    toast.success("Logged Out");
  };
}
