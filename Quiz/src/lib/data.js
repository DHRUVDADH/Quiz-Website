
import { AiOutlineDownload } from "react-icons/ai";


export const downloadData = {
    downloadData: [
        {
            name: "Application",
            function: (applicationID) => (applicationID),
        },
        {
            name: "Fees",
            function: (applicationID) => (applicationID , "regFeesProof"),
        },
        {
            name: "Confeerence",
            function: (applicationID) => (applicationID , "conferenceAcceptance"),
        },
        {
            name: "Indexing Proof",
            function: (applicationID) => (applicationID , "indexingProof"),
        }
    ],
   
}


export const application = {
    application: [
        {
           "quizName":"AIML 1",
           "subjectId":"IT241",
           "subjectName":"Ai&ML",
           "marks":"50",
           "questions":"25",
           "responses":"10"
        },
      
    ]
   
}