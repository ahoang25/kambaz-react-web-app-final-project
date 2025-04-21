import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import { useEffect, useState } from "react";
import * as courseClient from "./Courses/client";
import { useSelector } from "react-redux";
import * as userClient from "./Account/client";
import Unauthorized from "./Unauthorized";



export default function Kambaz() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [courses, setCourses] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]); 
  
  
  const fetchCourses = async () => {
    if (!currentUser?._id) return;
    const courses = await courseClient.fetchAllCourses();
    setCourses(courses);
  };
 

  const findCoursesForUser = async () => {
    try {
      const courses = await userClient.findCoursesForUser();
      console.log("ENROLLED COURSES:", courses);
      setEnrollments(courses);
    } catch (error) {
      console.error("Failed to fetch enrolled courses", error);
    }
  };

useEffect(() => {
  if (!currentUser || !currentUser._id) return;

  fetchCourses();
  findCoursesForUser();
}, [currentUser]);

  const addNewCourse = async (course: any) => {
    try {
      const newCourse = await courseClient.createCourse(course);
      setCourses([...courses, newCourse]);
    } catch (err) {
      console.error("Failed to create course", err);
    }
  };

  const updateCourse = async (updatedCourse: any) => {
    try {
      const savedCourse = await courseClient.updateCourse(updatedCourse);
      setCourses(
        courses.map((c) => (c._id === savedCourse._id ? savedCourse : c))
      );
    } catch (err) {
      console.error("Failed to update course", err);
    }
  };

  const deleteCourse = async (courseId: string) => {
    try {
      await courseClient.deleteCourse(courseId);
      setCourses(courses.filter((c) => c._id !== courseId));
    } catch (err) {
      console.error("Failed to delete course", err);
    }
  };

  const enrollUser = async (_userId: string, courseId: string) => {
    try {
      await courseClient.enrollIntoCourse(courseId); 
      await findCoursesForUser();
    } catch (err) {
      console.error("Enroll failed", err);
    }
  };
  
  const unenrollUser = async (_userId: string, courseId: string) => {
    try {
      await courseClient.unenrollFromCourse(courseId);  
      await findCoursesForUser();
    } catch (err) {
      console.error("Unenroll failed", err);
    }
  };

  return (
    <Session>
      <div id="wd-kambaz">
        <KambazNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route
              path="/Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard
                    courses={courses}
                    enrollments={enrollments}
                    addNewCourse={addNewCourse}
                    updateCourse={updateCourse}
                    deleteCourse={deleteCourse}
                    enrollUser={enrollUser}
                    unenrollUser={unenrollUser}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Courses/:cid/*"
              element={
                <ProtectedRoute>
                  <Courses />
                </ProtectedRoute>
              }
            />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
            <Route path="Unauthorized" element={<Unauthorized />} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
