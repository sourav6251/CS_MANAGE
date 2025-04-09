import { Link } from 'react-router-dom';
import { Users, BookOpen, Calendar, Clock } from 'lucide-react';
import { 
  notices, 
  meetings, 
  syllabi,
  faculty 
} from '../../data/mockData';
import { formatDate, formatTimeRange } from '../../lib/utils';

const DashboardFaculty = () => {
  const currentFaculty = faculty[1]; // Sarah Johnson
  const facultyMeetings = meetings.filter(meeting => 
    meeting.attendees.includes(currentFaculty.id)
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-700">Faculty Dashboard</h1>
        <p className="text-gray-600">Welcome back, {currentFaculty.name}</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <ActionCard 
          icon={<Users className="h-6 w-6 text-blue-500" />}
          title="Upcoming Meetings"
          description="You have 2 scheduled meetings"
          linkText="View Schedule"
          linkHref="/meetings"
        />
        <ActionCard 
          icon={<BookOpen className="h-6 w-6 text-emerald-500" />}
          title="Course Syllabus"
          description="Manage your course materials"
          linkText="View Syllabus"
          linkHref="/syllabus"
        />
        <ActionCard 
          icon={<Clock className="h-6 w-6 text-purple-500" />}
          title="Office Hours"
          description="Update your availability"
          linkText="Set Hours"
          linkHref="/"
        />
      </div>

      {/* Meetings & Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <UpcomingMeetings meetings={facultyMeetings} />
        <RecentNotices notices={notices} />
      </div>

      {/* Teaching Schedule */}
      <TeachingSchedule syllabi={syllabi.slice(0, 3)} />
    </div>
  );
};

const ActionCard = ({ icon, title, description, linkText, linkHref }) => (
  <div className="bg-white rounded-lg shadow hover:shadow-lg transition-all p-6 text-center">
    <div className="flex flex-col items-center">
      <div className="rounded-full bg-gray-100 p-3 mb-4">{icon}</div>
      <h3 className="font-medium text-lg mb-1">{title}</h3>
      <p className="text-gray-500 text-sm mb-4">{description}</p>
      <Link to={linkHref} className="text-blue-600 hover:underline text-sm font-medium">
        {linkText}
      </Link>
    </div>
  </div>
);

const RecentNotices = ({ notices }) => (
  <div className="bg-white rounded-lg shadow hover:shadow-lg transition-all">
    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
      <h2 className="text-lg font-semibold text-blue-700">Recent Notices</h2>
      <Link to="/notices" className="text-blue-500 hover:underline text-sm">View All</Link>
    </div>
    <div className="p-4">
      <ul className="divide-y divide-gray-200">
        {notices.map(notice => (
          <li key={notice.id} className="py-3 flex items-start">
            <div className="flex-shrink-0 mt-1">
              <i className="far fa-file-pdf text-blue-500 text-lg"></i>
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

const UpcomingMeetings = ({ meetings }) => (
  <div className="bg-white rounded-lg shadow hover:shadow-lg transition-all">
    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
      <h2 className="text-lg font-semibold text-blue-700">Upcoming Meetings</h2>
      <Link to="/meetings" className="text-blue-500 hover:underline text-sm">View All</Link>
    </div>
    <div className="p-4">
      {meetings.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {meetings.map(meeting => (
            <li key={meeting.id} className="py-3">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white mr-3">
                  <Calendar className="h-4 w-4" />
                </div>
                <h4 className="font-medium">{meeting.title}</h4>
              </div>
              <div className="ml-11">
                <p className="text-sm text-gray-600 mb-1">{meeting.description}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span className="mr-3">{formatDate(meeting.date)}</span>
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{formatTimeRange(meeting.startTime, meeting.endTime)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-4 text-gray-500">
          No upcoming meetings scheduled
        </div>
      )}
    </div>
  </div>
);

const TeachingSchedule = ({ syllabi }) => (
  <div className="bg-white rounded-lg shadow hover:shadow-lg transition-all mb-6">
    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
      <h2 className="text-lg font-semibold text-blue-700">Your Teaching Schedule</h2>
      <Link to="/syllabus" className="text-blue-500 hover:underline text-sm">View All Courses</Link>
    </div>
    <div className="p-4 grid grid-cols-1 gap-4">
      {syllabi.map(syllabus => (
        <div key={syllabus.id} className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium text-blue-700">{syllabus.paperTitle}</h3>
              <p className="text-sm text-gray-600">Code: {syllabus.paperCode} • Semester {syllabus.semester}</p>
            </div>
            <button className="px-3 py-1 border text-sm rounded hover:bg-gray-100 transition">
              View Syllabus
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Monday 9:00 AM
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Wednesday 9:00 AM
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Room 101
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default DashboardFaculty;
