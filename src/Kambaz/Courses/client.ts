import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
export const USERS_API = `${REMOTE_SERVER}/api/users`;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;
const MODULES_API = `${REMOTE_SERVER}/api/modules`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const findAllUsers = async () => {
  const response = await axiosWithCredentials.get(USERS_API);
  return response.data;
};


export const findUsersByPartialName = async (name: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}?name=${name}`);
  return response.data;
};

export const findUserById = async (id: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}/${id}`);
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await axiosWithCredentials.delete( `${USERS_API}/${userId}` );
  return response.data;
};

export const updateUser = async (user: any) => {
  const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

export const createUser = async (user: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}`, user);
  return response.data;
};

export const fetchAllCourses = async () => {
  const { data } = await axiosWithCredentials.get(COURSES_API);
  return data;
};

export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(COURSES_API, course);
  return data;
 };
 
  
 export const deleteCourse = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
  return data;
 };
 
  
  export const updateCourse = async (course: any) => {
    const { data } = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
    return data;
  };
  

  export const enrollIntoCourse = async (courseId: string) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/current/courses/${courseId}`);
    return response.data;
  };
  
  export const unenrollFromCourse = async (courseId: string) => {
    const response = await axiosWithCredentials.delete(`${USERS_API}/current/courses/${courseId}`);
    return response.data;
  };
  
   
  
  export const getUserEnrollments = async (userId: string) => {
    const response = await axiosWithCredentials.get(`${ENROLLMENTS_API}/user/${userId}`);
    return response.data;
  };

  export const createModuleForCourse = async (courseId: string, module: any) => {
    const response = await axiosWithCredentials.post(
      `${COURSES_API}/${courseId}/modules`,
      module
    );
    return response.data;
   };   

  export const findModulesForCourse = async (courseId: string) => {
    const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/modules`);
    return response.data;
   };
   
   export const updateModule = async (module: any) => {
    const { data } = await axiosWithCredentials.put(
      `${MODULES_API}/${module._id}`,
      module
    );
    return data;
   };
   
  
   export const deleteModule = async (moduleId: string) => {
    const response = await axiosWithCredentials.delete(
      `${MODULES_API}/${moduleId}`
    );
    return response.data;
   };
   
   

export const createAssignmentForCourse = async (courseId: string, assignment: any) => {
  const response = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/assignments`, assignment);
  return response.data;
};

export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};

export const updateAssignment = async (assignmentId: string, assignment: any) => {
  const { data } = await axiosWithCredentials.put(`${REMOTE_SERVER}/api/assignments/${assignmentId}`, assignment);
  return data;
};

export const deleteAssignment = async (assignmentId: string) => {
  const { data } = await axiosWithCredentials.delete(`${REMOTE_SERVER}/api/assignments/${assignmentId}`);
  return data;
};


export const findMyCourses = async () => {
  const response = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
  return response.data;
};
export const findCoursesForUser = async () => {
  const response = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
  return response.data;
};
export const profile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
};



export const findUsersForCourse = async (courseId: string) => {
 const response = await axios.get(`${COURSES_API}/${courseId}/users`);
 return response.data;
};
