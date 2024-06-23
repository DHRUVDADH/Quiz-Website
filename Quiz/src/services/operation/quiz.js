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


export async function getQuestionEdit(quizID ,setQuestions,setInitialQuestionCount,initializeQuestions, setLoading) {

  const toastId = toast.loading("Loading...");
  setLoading(true);

  try {
    const response = await apiConnector("GET", `http://localhost:3000/api/v1/quizdetails?quizID=${quizID}`);

    if (!response.data.success) {
      throw new Error('Failed to fetch quiz details');
    }

    const { success, quiz, question } = response.data;
    if (success) {
      if (question && question.length > 0) {
        setQuestions(question);
        localStorage.setItem(`${quizID}-questions`, JSON.stringify(question));
      } else {
        setInitialQuestionCount(quiz.noOfQuestion);
        initializeQuestions(quiz.noOfQuestion);
      }
    }

  } catch (error) {
    console.error('Error fetching quiz details:', error);
  }

  setLoading(false);
  toast.dismiss(toastId);
}


export async function setQuestinos(quizID ,questions, setQuestions,setLoading,navigate) {

  setLoading(true);

  try {
    const response = await apiConnector("POST", `http://localhost:3000/api/v1/setquestions`,{quizID,questions});

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    setQuestions([]);
    navigate("/faculty");
    toast.success("Question updated");
    localStorage.removeItem(`${quizID}-questions`);
  } catch (error) {
    toast.error(error.message);
    console.error('Error fetching quiz details:', error);
  }

  setLoading(false);
}

export async function fetchQuestions(quizID ,setQuestions,setSelectedOptions,setLoading) {

  setLoading(true);

  try {
    const response = await apiConnector("GET", `http://localhost:3000/api/v1/getquestions?quizID=${quizID}`);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    console.log(response.data)
    setQuestions(response.data.mcq);
    setSelectedOptions(Array(response.data.mcq.length).fill({ id: null, ans: null }))
    return response.data.mcq;
  } catch (error) {
    toast.error(error.message);
    console.error('Error fetching quiz details:', error);
  }
  setLoading(false);
}

export async function updateAnswer(quizID,questionID , ansVal) {

  try {
    const response = await apiConnector("POST", `http://localhost:3000/api/v1/updateanswer`,{quizID,questionID , ansVal});
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    localStorage.removeItem(`${quizID}-questions`);
  } catch (error) {
    toast.error(error.message);
    console.error('Error fetching quiz details:', error);
  }

}

export async function fetchAnswer(quizID ) {

  // setLoading(true);

  try {
    const response = await apiConnector("GET", `http://localhost:3000/api/v1/getanswer?quizID=${quizID}`);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data.answer;
  } catch (error) {
    toast.error(error.message);
    console.error('Error fetching quiz details:', error);
    return error;
  }
  // setLoading(false);
}
