import { useState } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { certificateRequests as initialRequests } from '../../data/mockData';
import { formatDate } from '../../lib/utils';
import { Download, Eye } from 'lucide-react';

const CertificateList = () => {
  const role = useSelector((state) => state.user.role); // Fetching role from Redux
  const isHod = role === 'hod';
  const isExternal = role === 'external';

  const [requests, setRequests] = useState(initialRequests);

  const filteredRequests = isExternal
    ? requests.filter((req) => req.requesterName === 'Rajesh Kumar') // Replace with real user data
    : requests;

  const handleApprove = (id) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: 'Approved' } : req
      )
    );
    toast.success('Request approved successfully');
  };

  const handleReject = (id) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              status: 'Rejected',
              rejectionReason: 'Request does not meet requirements',
            }
          : req
      )
    );
    toast.error('Request rejected');
  };

  const handleShowReason = (reason) => {
    toast(reason || 'No specific reason provided', { icon: '⚠️' });
  };

  return (
    <div className="border-0 rounded-lg overflow-hidden shadow-sm bg-white">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">
          {isHod ? 'Certificate Requests' : 'Your Request History'}
        </h2>
      </div>
      <div className="p-4 overflow-x-auto">
        {filteredRequests.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
                {isHod && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Requester
                  </th>
                )}
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certificate Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.id}>
                  <td className="px-4 py-3 whitespace-nowrap">#{request.id}</td>
                  {isHod && (
                    <td className="px-4 py-3 whitespace-nowrap">
                      {request.requesterName}
                    </td>
                  )}
                  <td className="px-4 py-3 whitespace-nowrap">
                    {formatDate(request.requestDate)}
                  </td>
                  <td className="px-4 py-3">{request.certificateType}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        request.status === 'Approved'
                          ? 'bg-green-100 text-green-800'
                          : request.status === 'Rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {isHod && request.status === 'Pending' ? (
                      <div className="flex space-x-2">
                        <button
                          className="px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded"
                          onClick={() => handleApprove(request.id)}
                        >
                          ✅ Approve
                        </button>
                        <button
                          className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded"
                          onClick={() => handleReject(request.id)}
                        >
                          ❌ Reject
                        </button>
                      </div>
                    ) : (
                      <div>
                        {request.status === 'Approved' ? (
                          <button className="text-blue-600 text-sm hover:underline flex items-center gap-1">
                            <Download className="h-4 w-4" /> Download
                          </button>
                        ) : request.status === 'Rejected' ? (
                          <button
                            className="text-blue-600 text-sm hover:underline flex items-center gap-1"
                            onClick={() => handleShowReason(request.rejectionReason)}
                          >
                            <Eye className="h-4 w-4" /> View Reason
                          </button>
                        ) : (
                          <button className="text-blue-600 text-sm hover:underline">
                            View Details
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center py-6 text-gray-500">
            {isExternal
              ? "You haven't made any certificate requests yet."
              : 'No certificate requests available.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default CertificateList;
