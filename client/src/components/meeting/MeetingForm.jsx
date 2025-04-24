import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import ApiFunction from '../services/ApiFunction';
import store from '../../redux/Store';

const MeetingForm = ({ onClose }) => {
  // import store from '../../redux/Store';
  const { role } = store.getState().user;
  const isHod = role === 'hod';
  const [meeting, setMeeting] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    selectedFaculty: [],
    allFaculty: false,
    meetingType: 'physical',
    location: '',
    emailParticipants: [], // New field for external emails
  });

  const [faculty, setFaculty] = useState([]);
  const [emailInput, setEmailInput] = useState('');
  const [loadingFaculty, setLoadingFaculty] = useState(true);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const facultyData = await ApiFunction.getFacultyMembers();
        setFaculty(facultyData);
      } catch (error) {
        toast.error('Failed to load faculty members');
      } finally {
        setLoadingFaculty(false);
      }
    };
    fetchFaculty();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeeting((prev) => ({ ...prev, [name]: value }));
  };

  const handleFacultyToggle = (id) => {
    setMeeting((prev) => {
      const selectedFaculty = prev.selectedFaculty.includes(id)
        ? prev.selectedFaculty.filter((fid) => fid !== id)
        : [...prev.selectedFaculty, id];
      return { ...prev, selectedFaculty, allFaculty: false };
    });
  };

  const handleAllFacultyToggle = (e) => {
    const checked = e.target.checked;
    setMeeting((prev) => ({
      ...prev,
      allFaculty: checked,
      selectedFaculty: checked ? faculty.map((f) => f.id) : [],
    }));
  };

  const handleEmailInput = (e) => {
    setEmailInput(e.target.value);
  };

  const addEmailParticipant = () => {
    if (!emailInput) return;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailInput)) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (
      meeting.emailParticipants.includes(emailInput) ||
      faculty.find((f) => f.email === emailInput)
    ) {
      toast.error('Email already added or exists in faculty list');
      return;
    }
    setMeeting((prev) => ({
      ...prev,
      emailParticipants: [...prev.emailParticipants, emailInput],
    }));
    setEmailInput('');
  };

  const removeEmailParticipant = (email) => {
    setMeeting((prev) => ({
      ...prev,
      emailParticipants: prev.emailParticipants.filter((e) => e !== email),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!meeting.title || !meeting.date || !meeting.startTime || !meeting.endTime) {
      toast.error('Please fill all required fields');
      return;
    }

    if (meeting.selectedFaculty.length === 0 && meeting.emailParticipants.length === 0) {
      toast.error('Please select at least one faculty member or add an email');
      return;
    }

    if (meeting.startTime >= meeting.endTime) {
      toast.error('Start time must be before end time');
      return;
    }

    if (!meeting.location) {
      toast.error(`Please provide a ${meeting.meetingType === 'physical' ? 'meeting room' : 'meeting link'}`);
      return;
    }

    try {
      await ApiFunction.createMeeting({ ...meeting, faculty });
      toast.success('Meeting scheduled successfully');
      setMeeting({
        title: '',
        description: '',
        date: '',
        startTime: '',
        endTime: '',
        selectedFaculty: [],
        allFaculty: false,
        meetingType: 'physical',
        location: '',
        emailParticipants: [],
      });
      setEmailInput('');
      onClose();
    } catch (error) {
      toast.error('Failed to schedule meeting');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Schedule New Meeting</h2>
      <div className="mb-4 text-sm text-gray-600">
        <span className="font-medium">Logged in as:</span>{' '}
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">{role}</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Title *</label>
            <input
              type="text"
              name="title"
              value={meeting.title}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Meeting title"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Date *</label>
            <input
              type="date"
              name="date"
              value={meeting.date}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Start Time *</label>
            <input
              type="time"
              name="startTime"
              value={meeting.startTime}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">End Time *</label>
            <input
              type="time"
              name="endTime"
              value={meeting.endTime}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={meeting.description}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows="4"
            placeholder="Meeting agenda or notes..."
          ></textarea>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Meeting Type</label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="meetingType"
                value="physical"
                checked={meeting.meetingType === 'physical'}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">Physical Meeting</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="meetingType"
                value="virtual"
                checked={meeting.meetingType === 'virtual'}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">Virtual Meeting</span>
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {meeting.meetingType === 'physical' ? 'Meeting Room' : 'Meeting Link'} *
          </label>
          <input
            type="text"
            name="location"
            value={meeting.location}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder={
              meeting.meetingType === 'physical' ? 'Room 101' : 'https://meet.example.com/abc-xyz'
            }
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Select Faculty</label>
          {loadingFaculty ? (
            <div className="text-center py-4">
              <i className="fas fa-spinner fa-spin text-blue-500"></i> Loading faculty...
            </div>
          ) : (
            <>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="selectAll"
                  checked={meeting.allFaculty}
                  onChange={handleAllFacultyToggle}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="selectAll" className="ml-2 text-sm text-gray-700">
                  Select All Faculty
                </label>
              </div>
              <div className="border border-gray-200 rounded-md p-3 max-h-60 overflow-y-auto">
                {faculty.length > 0 ? (
                  faculty.map((f) => (
                    <div key={f.id} className="flex items-center py-2">
                      <input
                        type="checkbox"
                        id={`faculty-${f.id}`}
                        checked={meeting.selectedFaculty.includes(f.id)}
                        onChange={() => handleFacultyToggle(f.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor={`faculty-${f.id}`} className="ml-2 text-sm text-gray-700">
                        <span className="font-medium">{f.name}</span> -{' '}
                        <span className="text-gray-500">{f.department}</span>
                      </label>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No faculty members found</p>
                )}
              </div>
            </>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Invite by Email
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              value={emailInput}
              onChange={handleEmailInput}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter email address"
            />
            <button
              type="button"
              onClick={addEmailParticipant}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          {meeting.emailParticipants.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-700">Added Emails:</p>
              <ul className="mt-1 space-y-1">
                {meeting.emailParticipants.map((email) => (
                  <li key={email} className="flex items-center justify-between text-sm">
                    <span>{email}</span>
                    <button
                      type="button"
                      onClick={() => removeEmailParticipant(email)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-gray-200 flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Schedule Meeting
          </button>
        </div>
      </form>
    </div>
  );
};

export default MeetingForm;