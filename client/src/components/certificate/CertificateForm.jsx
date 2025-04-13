import { useState } from 'react';
import toast from 'react-hot-toast';
import { semesters, certificateTypes } from '../../data/mockData';

const CertificateForm = () => {
  const [certificate, setCertificate] = useState({
    requesterName: '',
    organization: '',
    semester: '',
    examDate: '',
    studentCount: '',
    certificateType: '',
    reason: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCertificate(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      requesterName, organization, semester, examDate,
      studentCount, certificateType, reason
    } = certificate;

    if (
      !requesterName || !organization || !semester ||
      !examDate || !studentCount || !certificateType || !reason
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (parseInt(studentCount) <= 0) {
      toast.error("Number of students must be a positive number");
      return;
    }

    toast.success("Certificate request submitted successfully");

    setCertificate({
      requesterName: '',
      organization: '',
      semester: '',
      examDate: '',
      studentCount: '',
      certificateType: '',
      reason: ''
    });
  };

  return (
    <div className="rounded-md shadow-sm border border-gray-200 overflow-hidden mb-6 bg-white">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-primary">New Certificate Request</h2>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="requesterName" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input
                type="text"
                id="requesterName"
                name="requesterName"
                value={certificate.requesterName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <div>
              <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={certificate.organization}
                onChange={handleChange}
                placeholder="Enter your organization name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
              <select
                id="semester"
                name="semester"
                value={certificate.semester}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                <option value="">Select Semester</option>
                {semesters.map(semester => (
                  <option key={semester} value={semester}>Semester {semester}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="examDate" className="block text-sm font-medium text-gray-700 mb-1">Exam Date</label>
              <input
                type="date"
                id="examDate"
                name="examDate"
                value={certificate.examDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="studentCount" className="block text-sm font-medium text-gray-700 mb-1">Number of Students</label>
              <input
                type="number"
                id="studentCount"
                name="studentCount"
                value={certificate.studentCount}
                onChange={handleChange}
                placeholder="Enter number of students"
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <div>
              <label htmlFor="certificateType" className="block text-sm font-medium text-gray-700 mb-1">Certificate Type</label>
              <select
                id="certificateType"
                name="certificateType"
                value={certificate.certificateType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                <option value="">Select Certificate Type</option>
                {certificateTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">Reason for Request</label>
            <textarea
              id="reason"
              name="reason"
              value={certificate.reason}
              onChange={handleChange}
              rows="3"
              placeholder="Please explain the purpose of this certificate request"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <i className="fas fa-paper-plane mr-1"></i> Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CertificateForm;
