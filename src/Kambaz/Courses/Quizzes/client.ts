import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;
const USERS_API = `${REMOTE_SERVER}/api/users`;


const axiosWithCredentials = axios.create({ withCredentials: true });


export const findQuizzesForCourse = async (courseId: string) => {
    const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
  };
  
export const createQuizForCourse = async (courseId: string) => {
  const defaultQuiz = {
    title: "New Quiz",
    description: "",
    available: "",
    due: "",
    points: 0,
    published: false,
    questions: []
  };

  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/quizzes`,
    defaultQuiz
  );

  return response.data; 
};

  
  export const updateQuiz = async (quizId: string, quiz: any) => {
    const response = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}`, quiz);
    return response.data;
  };
  
  export const deleteQuiz = async (quizId: string) => {
    const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
  };
  
  export const findQuizById = async (quizId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
    return response.data;
  };


  // Questions

export const findQuestionsForQuiz = async (quizId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/questions`);
    return response.data;
  };
  
  export const createQuestion = async (quizId: string, question: any) => {
    const response = await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/questions`, question);
    return response.data;
  };
  
  export const updateQuestion = async (questionId: string, question: any) => {
    const response = await axiosWithCredentials.put(`${QUESTIONS_API}/${questionId}`, question);
    return response.data;
  };
  
  export const deleteQuestion = async (questionId: string) => {
    const response = await axiosWithCredentials.delete(`${QUESTIONS_API}/${questionId}`);
    return response.data;
  };
  
  export const findQuestionById = async (questionId: string) => {
    const response = await axiosWithCredentials.get(`${QUESTIONS_API}/${questionId}`);
    return response.data;
  };

  // Quiz Attempts


export const submitAttempt = async (
    qid: string,
    uid: string,
    answers: any,
    score: number
  ) => {
    const response = await axiosWithCredentials.post(
      `${REMOTE_SERVER}/api/attempts/${qid}/${uid}`,
      { answers, score }
    );
    return response.data;
  };
  
  export const findLastAttempt = async (qid: string, uid: string) => {
    const response = await axiosWithCredentials.get(
      `${REMOTE_SERVER}/api/attempts/${qid}/${uid}/last`
    );
    return response.data;
  };
  
  export const countAttempts = async (qid: string, uid: string) => {
    const response = await axiosWithCredentials.get(
      `${REMOTE_SERVER}/api/attempts/${qid}/${uid}/count`
    );
    return response.data.count;
  };
  
  export const profile = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
    return response.data;
  };