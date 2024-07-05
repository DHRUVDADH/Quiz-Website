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

export async function fetchQuestions(quizID ,setQuizDesc,setQuestions,setSelectedOptions,setLoading,navigate) {

  setLoading(true);

  try {
    const response = await apiConnector("GET", `http://localhost:3000/api/v1/getquestions?quizID=${quizID}`);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    setQuizDesc(response.data.quiz)
    setQuestions(response.data.mcq);
    setSelectedOptions(Array(response.data.mcq.length).fill({ id: null, ans: null }))
    return {mcq:response.data.mcq , success:response.data.success};
  } catch (error) {
    toast.error(error.message);
    console.error('Error fetching quiz details:', error);
    navigate("/");
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

export async function submitQuiz(quizID,setLoading,navigate ) {

  setLoading(true);

  try {
    const response = await apiConnector("GET", `http://localhost:3000/api/v1/quizsubmit?quizID=${quizID}`);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Saved Successfully");
    navigate("/");
  } catch (error) {
    toast.error(error.message);
    console.error('Error fetching quiz details:', error);
    return error;
  }
  setLoading(false);
}

export async function fetchQuesList(setLoading,setUserData) {

  setLoading(true);

  try {
    const response = await apiConnector("GET", `http://localhost:3000/api/v1/facultydash`);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    setUserData(response.data.quizes);

  } catch (error) {
    toast.error(error.message);
  }
  setLoading(false);
}

export async function fetchQuizDetils(quizID,setLoading,setData,closeModal) {

  setLoading(true);

  try {
    const response = await apiConnector("GET", `http://localhost:3000/api/v1/quizDetails?quizID=${quizID}`);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    setData(response.data.quiz);

  } catch (error) {
    toast.error(error.message);
    setEditModal(false);
  }
  setLoading(false);
}

export async function editDescription(quizID,setLoading,data,setCodeModal,closeModal) {

  setLoading(true);

  try {
    const response = await apiConnector("POST", `http://localhost:3000/api/v1/editdesciption`,{quizID , data});

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    setCodeModal(true);

  } catch (error) {
    toast.error(error.message);
    closeModal();
  }
  setLoading(false);
}


export async function fetchResults(quizID ,setLoading,setUserData) {

  setLoading(true);

  try {
    const response = await apiConnector("GET", `http://localhost:3000/api/v1/quizresponse?quizID=${quizID}`);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    setUserData(response.data.data);
   
  } catch (error) {
    toast.error(error.message);
    console.error('Error fetching quiz details:', error);
  }
  setLoading(false);
}