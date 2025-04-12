import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  BookOpen,
  Bell,
  FileText,
  Download
} from 'lucide-react';
import { 
  notices, 
  routines,
  syllabi,
  students 
} from '../../data/mockData';
import { formatDate } from '../../lib/utils';

const DashboardStudent = () => {
  const currentStudent = students[0];
  const currentSemesterCourses = syllabi.filter(
    syllabus => syllabus.semester === currentStudent.semester
  );
  const semesterRoutines = routines.filter(
    routine => routine.semester === currentStudent.semester
  );

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary">Student Dashboard</h1>
        <p className="text-gray-600">Welcome back, {currentStudent.name}</p>
      </div>

      {/* Student Info Card */}
      <div className="bg-white shadow-sm rounded-md p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-16 h-16 rounded-full bg-secondary text-white flex items-center justify-center mr-4">
              <span className="text-lg font-medium">RK</span>
            </div>
            <div>
              <h3 className="text-xl font-medium">{currentStudent.name}</h3>
              <p className="text-gray-600">Department of {currentStudent.department}</p>
              <div className="mt-1 text-sm bg-primary/10 text-primary px-2 py-0.5 rounded w-fit">
                Semester {currentStudent.semester}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <button className="border border-gray-300 px-3 py-1 rounded text-sm flex items-center justify-center">
              <FileText className="h-4 w-4 mr-2" />
              View Transcript
            </button>
            <button className="border border-gray-300 px-3 py-1 rounded text-sm flex items-center justify-center">
              <Download className="h-4 w-4 mr-2" />
              Download ID Card
            </button>
          </div>
        </div>
      </div>

      {/* Current Semester Courses */}
      <h2 className="text-xl font-semibold mb-4">Current Semester Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {currentSemesterCourses.map(course => (
          <div key={course.id} className="bg-white shadow-sm p-4 rounded-md">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">{course.paperTitle}</h3>
                <p className="text-sm text-gray-500">Code: {course.paperCode}</p>
              </div>
              <Link
                to={`/syllabus/${course.id}`}
                className="text-sm text-blue-500 hover:underline"
              >
                Details
              </Link>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span className="font-medium">{Math.floor(Math.random() * 100)}%</span>
              </div>
              <progress
                value={Math.floor(Math.random() * 100)}
                max="100"
                className="w-full h-2"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Today's Schedule & Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <TodaySchedule routines={semesterRoutines} />
        <RecentNotices notices={notices} />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <ActionCard
          icon={<BookOpen className="h-6 w-6 text-emerald-500" />}
          title="View Syllabus"
          description="Access all course materials and reading lists"
          linkHref="/syllabus"
        />
        <ActionCard
          icon={<Calendar className="h-6 w-6 text-blue-500" />}
          title="Class Schedule"
          description="Check your weekly class schedule"
          linkHref="/routine"
        />
        <ActionCard
          icon={<Bell className="h-6 w-6 text-amber-500" />}
          title="Notice Board"
          description="Stay updated with latest announcements"
          linkHref="/notices"
        />
      </div>
    </div>
  );
};

// Sub-components...

const TodaySchedule = ({ routines }) => {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todaysClasses = routines.filter(r => r.day === today);

  return (
    <div className="bg-white shadow-sm rounded-md overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-primary">Today's Schedule</h2>
        <Link to="/routine" className="text-sm text-blue-500 hover:underline">Full Schedule</Link>
      </div>
      <div className="p-4">
        {todaysClasses.length ? (
          <ul className="divide-y divide-gray-200">
            {todaysClasses.map(cls => (
              <li key={cls.id} className="py-3 flex justify-between">
                <div>
                  <h4 className="font-medium">
                    {syllabi.find(s => s.paperCode === cls.paperCode)?.paperTitle || cls.paperCode}
                  </h4>
                  <p className="text-sm text-gray-600">{cls.room}</p>
                </div>
                <div className="text-sm text-primary font-medium">
                  {cls.startTime} - {cls.endTime}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8">
            <Calendar className="h-10 w-10 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">No classes scheduled for today</p>
          </div>
        )}
      </div>
    </div>
  );
};

const RecentNotices = ({ notices }) => {
  return (
    <div className="bg-white shadow-sm rounded-md overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-primary">Recent Notices</h2>
        <Link to="/notices" className="text-sm text-blue-500 hover:underline">View All</Link>
      </div>
      <div className="p-4">
        <ul className="divide-y divide-gray-200">
          {notices.map(notice => (
            <li key={notice.id} className="py-3 flex items-start">
              <div className="p-2 rounded-full bg-primary/10">
                <Bell className="h-4 w-4 text-primary" />
              </div>
              <div className="ml-3">
                <h4 className="font-medium">{notice.title}</h4>
                <p className="text-sm text-gray-600">Published on {formatDate(notice.publishDate)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ActionCard = ({ icon, title, description, linkHref }) => (
  <div className="bg-white shadow-sm p-6 rounded-md hover:shadow-md transition-shadow duration-300">
    <Link to={linkHref} className="block">
      <div className="bg-gray-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-medium text-lg mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </Link>
  </div>
);

export default DashboardStudent;
