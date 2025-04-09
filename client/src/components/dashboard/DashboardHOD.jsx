import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  UserCheck,
  Award,
  CalendarCheck
} from 'lucide-react';
import {
  stats,
  notices,
  certificateRequests,
  meetings
} from '../../data/mockData';
import { formatDate } from '../../lib/utils';

const DashboardHOD = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
        <p className="text-gray-600">Welcome back, Admin HOD</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<User className="text-blue-600 w-6 h-6" />} title="Faculty Members" value={stats.facultyCount} bg="bg-blue-100" />
        <StatCard icon={<UserCheck className="text-green-600 w-6 h-6" />} title="Students" value={stats.studentCount} bg="bg-green-100" />
        <StatCard icon={<Award className="text-red-600 w-6 h-6" />} title="Certificate Requests" value={stats.certificateRequestsCount} bg="bg-red-100" />
        <StatCard icon={<CalendarCheck className="text-yellow-600 w-6 h-6" />} title="Upcoming Meetings" value={stats.upcomingMeetingsCount} bg="bg-yellow-100" />
      </div>

      {/* Recent Notices & Pending Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <RecentNotices notices={notices} />
        <PendingCertificates certificates={certificateRequests} />
      </div>

      {/* Upcoming Meetings */}
      <UpcomingMeetings meetings={meetings} />
    </div>
  );
};

const StatCard = ({ icon, title, value, bg }) => (
  <div className="bg-white shadow rounded-lg p-4 flex items-center">
    <div className={`${bg} p-3 rounded-full mr-4`}>
      {icon}
    </div>
    <div>
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const RecentNotices = ({ notices }) => (
  <div className="bg-white shadow rounded-lg overflow-hidden">
    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
      <h2 className="text-lg font-semibold text-primary">Recent Notices</h2>
      <Link to="/notices" className="text-secondary hover:underline text-sm">View All</Link>
    </div>
    <div className="p-4">
      <ul className="divide-y divide-gray-200">
        {notices.map(notice => (
          <li key={notice.id} className="py-3 flex items-start">
            <i className="far fa-file-pdf text-accent text-lg mr-3 mt-1"></i>
            <div>
              <h4 className="font-medium">{notice.title}</h4>
              <p className="text-sm text-gray-600">Published on {formatDate(notice.publishDate)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const PendingCertificates = ({ certificates }) => {
  const [requests, setRequests] = useState(certificates);

  const handleApproveRequest = id => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: 'Approved' } : req));
  };

  const handleRejectRequest = id => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: 'Rejected' } : req));
  };

  const pendingRequests = requests.filter(req => req.status === 'Pending');

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-primary">Pending Certificate Requests</h2>
        <Link to="/certificates" className="text-secondary hover:underline text-sm">View All</Link>
      </div>
      <div className="p-4">
        <ul className="divide-y divide-gray-200">
          {pendingRequests.length > 0 ? (
            pendingRequests.map(req => (
              <li key={req.id} className="py-3 flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{req.requesterName}</h4>
                  <p className="text-sm text-gray-600">Semester {req.semester} • {formatDate(req.examDate)}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleApproveRequest(req.id)} className="px-3 py-1 text-sm rounded bg-green-500 text-white hover:bg-green-600">
                    <i className="fas fa-check mr-1"></i> Approve
                  </button>
                  <button onClick={() => handleRejectRequest(req.id)} className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600">
                    <i className="fas fa-times mr-1"></i> Reject
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="py-4 text-center text-gray-500">No pending certificate requests</li>
          )}
        </ul>
      </div>
    </div>
  );
};

const UpcomingMeetings = ({ meetings }) => (
  <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
      <h2 className="text-lg font-semibold text-primary">Upcoming Meetings</h2>
      <Link to="/meetings" className="text-secondary hover:underline text-sm">Schedule Meeting</Link>
    </div>
    <div className="p-4">
      <ul className="divide-y divide-gray-200">
        {meetings.map(meeting => (
          <li key={meeting.id} className="py-3 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white mr-3">
                <i className="fas fa-users"></i>
              </div>
              <div>
                <h4 className="font-medium">{meeting.title}</h4>
                <p className="text-sm text-gray-600">{meeting.participants}</p>
              </div>
            </div>
            <div className="flex items-center text-gray-600">
              <i className="far fa-calendar-alt mr-2"></i>
              <span>{formatDate(meeting.date)}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <i className="far fa-clock mr-2"></i>
              <span>{meeting.startTime} - {meeting.endTime}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default DashboardHOD;
