import { useSelector } from 'react-redux';
import {
  Award,
  FileText,
  User,
  Building,
  Calendar,
  CheckCircle,
} from 'lucide-react';
import { certificateRequests, certificateTypes } from '../../data/mockData';
import { formatDate } from '../../lib/utils';
import { Link } from 'react-router-dom';

const DashboardExternal = () => {
  const role = useSelector((state) => state.user.role);
  const isExternal = role === 'external';

  const userRequests = certificateRequests;

  if (!isExternal) return null;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-700">External User Dashboard</h1>
        <p className="text-gray-600">Welcome to the Certificate Request Portal</p>
      </div>

      {/* Profile Summary */}
      <div className="mb-6 border-0 rounded-lg shadow p-6 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white mr-4">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-medium">Rajesh Kumar</h3>
              <p className="text-gray-600">ABC University</p>
              <div className="flex items-center mt-1">
                <Building className="h-4 w-4 mr-1 text-gray-500" />
                <span className="text-sm text-gray-600">External Examiner</span>
              </div>
            </div>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            <Award className="h-4 w-4 mr-2" />
            New Certificate Request
          </button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatusCard 
          title="Total Requests"
          value={userRequests.length}
          icon={<FileText className="h-6 w-6 text-blue-500" />}
          color="blue"
        />
        <StatusCard 
          title="Approved"
          value={userRequests.filter(req => req.status === 'Approved').length}
          icon={<CheckCircle className="h-6 w-6 text-green-500" />}
          color="green"
        />
        <StatusCard 
          title="Pending"
          value={userRequests.filter(req => req.status === 'Pending').length}
          icon={<Calendar className="h-6 w-6 text-amber-500" />}
          color="amber"
        />
      </div>

      {/* Certificate Types */}
      {/* <h2 className="text-xl font-semibold mb-4">Certificate Types</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {certificateTypes.map((type, index) => (
          <CertificateTypeCard key={index} type={type} />
        ))}
      </div> */}

      {/* Recent Requests */}
      <h2 className="text-xl font-semibold mb-4">Your Recent Requests</h2>
      <div className="border-0 rounded-lg overflow-hidden shadow bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-0">
                <th className="px-4 py-3 text-left text-sm text-gray-600">ID</th>
                <th className="px-4 py-3 text-left text-sm text-gray-600">Type</th>
                <th className="px-4 py-3 text-left text-sm text-gray-600">Date</th>
                <th className="px-4 py-3 text-left text-sm text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-sm text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {userRequests.map((request) => (
                <tr key={request.id}>
                  <td className="px-4 py-3 text-sm">{request.id}</td>
                  <td className="px-4 py-3 text-sm">{request.certificateType}</td>
                  <td className="px-4 py-3 text-sm">{formatDate(request.requestDate)}</td>
                  <td className="px-4 py-3 text-sm">
                    <StatusBadge status={request.status} />
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <Link
                      to={`/certificates/${request.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatusCard = ({ icon, title, value, color }) => {
  return (
    <div className="flex items-center p-4 border-0 rounded-lg shadow bg-white">
      <div className={`rounded-full bg-${color}-100 p-3 mr-4`}>
        {icon}
      </div>
      <div>
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

const CertificateTypeCard = ({ type }) => {
  return (
    <div className="border-0 rounded-lg shadow bg-white hover:shadow-md transition">
      <div className="p-4 bg-blue-50 border-0">
        <h3 className="text-blue-700 font-medium">{type}</h3>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-4">{getTypeDescription(type)}</p>
        <button className="w-full px-4 py-2 border-0 text-sm rounded hover:bg-gray-100 transition">
          Request this Certificate
        </button>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  let base = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ";
  let classes = {
    Approved: "bg-green-100 text-green-800",
    Pending: "bg-amber-100 text-amber-800",
    Rejected: "bg-red-100 text-red-800",
    Default: "bg-gray-100 text-gray-800",
  };
  return <span className={base + (classes[status] || classes.Default)}>{status}</span>;
};

const getTypeDescription = (type) => {
  switch (type) {
    case 'Examination Certificate':
      return 'Official certificate for conducting examinations as an external examiner.';
    case 'Participation Certificate':
      return 'Certificate for participating in workshops, seminars or other events.';
    case 'Course Completion':
      return 'Certificate for students who have completed specific courses or programs.';
    default:
      return 'Certificate issued by the department.';
  }
};

export default DashboardExternal;
