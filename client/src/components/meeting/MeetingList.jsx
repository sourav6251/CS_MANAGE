import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Calendar, Clock, MapPin, Users, Video, AlertCircle, Mail } from 'lucide-react';
import { toast } from 'sonner';
import ApiFunction from '../services/ApiFunction';
import store from '../../redux/Store';

const MeetingList = () => {
  const { role, userid } = store.getState().user;
  const isHod = role === 'hod';

  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      setLoading(true);
      try {
        const res = await ApiFunction.getMeetings();
        const mappedMeetings = res.map((meeting) => ({
          id: meeting._id,
          title: meeting.title,
          description: meeting.description,
          date: new Date(meeting.mettingTime).toISOString().split('T')[0],
          startTime: new Date(meeting.mettingTime).toTimeString().slice(0, 5),
          endTime: new Date(meeting.endTime || new Date(new Date(meeting.mettingTime).getTime() + 60 * 60 * 1000)).toTimeString().slice(0, 5),
          participants: meeting.participants.length,
          isVirtual: meeting.mettingArea.includes('http'),
          location: meeting.mettingArea,
          attendees: meeting.participants
            .filter((p) => p.user)
            .map((p) => p.user._id),
        }));
        setMeetings(mappedMeetings);
      } catch (err) {
        console.error('Failed to fetch meetings', err);
        setError('Failed to load meetings. Please try again later.');
        toast.error('Failed to load meetings');
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  const handleNotify = async (meetingId) => {
    try {
      await ApiFunction.notifyParticipants(meetingId);
      toast.success('Notifications sent to participants');
    } catch (error) {
      toast.error('Failed to send notifications');
      console.error('Notify error:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTimeRange = (startTime, endTime) => {
    return `${startTime} - ${endTime}`;
  };

  const filteredMeetings = isHod
    ? meetings
    : meetings.filter((meeting) => meeting.attendees.includes(userid));

  const isMeetingPast = (meetingDate) => {
    return new Date(meetingDate) < new Date();
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Meetings</h3>
          <p className="text-gray-600 max-w-md">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {isHod ? 'All Scheduled Meetings' : 'Your Upcoming Meetings'}
          </h2>
          <div className="text-sm text-gray-500">
            Showing {filteredMeetings.length} {filteredMeetings.length === 1 ? 'meeting' : 'meetings'}
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {filteredMeetings.length > 0 ? (
          filteredMeetings.map((meeting) => (
            <div
              key={meeting.id}
              className={`p-6 hover:bg-gray-50 transition-colors rounded-lg shadow-blue-50 my-3 ${
                isMeetingPast(meeting.date) ? 'opacity-80' : ''
              }`}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-1 flex-shrink-0 h-3 w-3 rounded-full ${
                        isMeetingPast(meeting.date) ? 'bg-gray-400' : 'bg-blue-500'
                      }`}
                    ></div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium text-gray-900">{meeting.title}</h3>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            isMeetingPast(meeting.date)
                              ? 'bg-gray-100 text-gray-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {isMeetingPast(meeting.date) ? 'Completed' : 'Upcoming'}
                        </span>
                      </div>
                      <p className="mt-1 text-gray-600">{meeting.description}</p>

                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-start">
                          <Calendar className="flex-shrink-0 h-4 w-4 mt-0.5 mr-2 text-gray-500" />
                          <div>
                            <div className="text-gray-500">Date</div>
                            <div className="text-gray-900">{formatDate(meeting.date)}</div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Clock className="flex-shrink-0 h-4 w-4 mt-0.5 mr-2 text-gray-500" />
                          <div>
                            <div className="text-gray-500">Time</div>
                            <div className="text-gray-900">
                              {formatTimeRange(meeting.startTime, meeting.endTime)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Users className="flex-shrink-0 h-4 w-4 mt-0.5 mr-2 text-gray-500" />
                          <div>
                            <div className="text-gray-500">Participants</div>
                            <div className="text-gray-900">{meeting.participants} participants</div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          {meeting.isVirtual ? (
                            <Video className="flex-shrink-0 h-4 w-4 mt-0.5 mr-2 text-gray-500" />
                          ) : (
                            <MapPin className="flex-shrink-0 h-4 w-4 mt-0.5 mr-2 text-gray-500" />
                          )}
                          <div>
                            <div className="text-gray-500">Location</div>
                            <div className="text-gray-900">
                              {meeting.isVirtual ? (
                                <a href={meeting.location} className="text-blue-600 hover:underline">
                                  Join Virtual Meeting
                                </a>
                              ) : (
                                meeting.location
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {isHod && (
                  <div className="flex flex-col sm:flex-row md:flex-col gap-2">
                    <button className="px-3 py-1.5 inline-flex items-center border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
                      Edit
                    </button>
                    <button className="px-3 py-1.5 inline-flex items-center border border-red-200 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                      Cancel
                    </button>
                    <button
                      onClick={() => handleNotify(meeting.id)}
                      className="px-3 py-1.5 inline-flex items-center border border-blue-200 rounded-md text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Notify
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center">
            <div className="mx-auto max-w-md">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No meetings scheduled</h3>
              <p className="mt-1 text-gray-500">
                {isHod
                  ? 'Get started by scheduling a new meeting.'
                  : 'You have no upcoming meetings scheduled.'}
              </p>
              {isHod && (
                <div className="mt-6">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Schedule New Meeting
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingList;