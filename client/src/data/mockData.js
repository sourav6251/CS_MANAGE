// Mock departments
export const departments = [
  "Computer Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Economics"
];

// Mock faculty members
export const faculty = [
  { id: 1, name: "Dr. John Smith", department: "Computer Science", email: "john.smith@example.edu", phone: "123-456-7890" },
  { id: 2, name: "Dr. Sarah Johnson", department: "Computer Science", email: "sarah.johnson@example.edu", phone: "123-456-7891" },
  { id: 3, name: "Prof. Michael Brown", department: "Mathematics", email: "michael.brown@example.edu", phone: "123-456-7892" },
  { id: 4, name: "Dr. Lisa Davis", department: "Physics", email: "lisa.davis@example.edu", phone: "123-456-7893" },
  { id: 5, name: "Dr. Robert Wilson", department: "Chemistry", email: "robert.wilson@example.edu", phone: "123-456-7894" }
];

// Mock students
export const students = [
  { id: 1, name: "Raj Kumar", department: "Computer Science", semester: 6, email: "raj.kumar@example.edu", phone: "123-456-7895" },
  { id: 2, name: "Priya Singh", department: "Computer Science", semester: 4, email: "priya.singh@example.edu", phone: "123-456-7896" },
  { id: 3, name: "Amit Verma", department: "Mathematics", semester: 2, email: "amit.verma@example.edu", phone: "123-456-7897" },
  { id: 4, name: "Deepika Patel", department: "Physics", semester: 8, email: "deepika.patel@example.edu", phone: "123-456-7898" }
];

// Mock notices
export const notices = [
  {
    id: 1,
    title: "End Semester Examination Schedule",
    description: "The end semester examinations will commence from June 15, 2023. All students are requested to check the detailed schedule and venue information.",
    publishDate: "2023-05-25",
    category: "Examination",
    hasPdf: true
  },
  {
    id: 2,
    title: "Faculty Meeting - Academic Planning",
    description: "All faculty members are requested to attend a meeting regarding academic planning for the next semester on May 30, 2023 at 10:00 AM.",
    publishDate: "2023-05-20",
    category: "Meeting",
    hasPdf: true
  },
  {
    id: 3,
    title: "Student Registration for Next Semester",
    description: "Registration for the next semester will begin from June 1, 2023. Students are advised to clear all pending dues before the registration process.",
    publishDate: "2023-05-18",
    category: "Registration",
    hasPdf: true
  }
];

// Mock syllabi
export const syllabi = [
  { id: 1, semester: 1, paperCode: "CS101", paperTitle: "Introduction to Programming", uploadDate: "2023-05-15", hasPdf: true },
  { id: 2, semester: 1, paperCode: "CS102", paperTitle: "Computer Organization", uploadDate: "2023-05-15", hasPdf: true },
  { id: 3, semester: 2, paperCode: "CS201", paperTitle: "Data Structures", uploadDate: "2023-05-14", hasPdf: true },
  { id: 4, semester: 3, paperCode: "CS301", paperTitle: "Algorithm Design", uploadDate: "2023-05-12", hasPdf: true },
  { id: 5, semester: 4, paperCode: "CS401", paperTitle: "Database Management Systems", uploadDate: "2023-05-10", hasPdf: true }
];

// Mock routines
export const routines = [
  { id: 1, semester: 1, paperCode: "CS101", day: "Monday", startTime: "09:00", endTime: "10:30", room: "Room 101" },
  { id: 2, semester: 1, paperCode: "CS102", day: "Monday", startTime: "11:00", endTime: "12:30", room: "Room 102" },
  { id: 3, semester: 1, paperCode: "CS101", day: "Wednesday", startTime: "09:00", endTime: "10:30", room: "Room 101" },
  { id: 4, semester: 1, paperCode: "CS102", day: "Wednesday", startTime: "11:00", endTime: "12:30", room: "Room 102" },
  { id: 5, semester: 1, paperCode: "CS101", day: "Friday", startTime: "09:00", endTime: "10:30", room: "Room 101" },
  { id: 6, semester: 2, paperCode: "CS201", day: "Tuesday", startTime: "09:00", endTime: "10:30", room: "Room 103" },
  { id: 7, semester: 2, paperCode: "CS201", day: "Thursday", startTime: "09:00", endTime: "10:30", room: "Room 103" },
  { id: 8, semester: 3, paperCode: "CS301", day: "Monday", startTime: "14:00", endTime: "15:30", room: "Room 201" },
  { id: 9, semester: 3, paperCode: "CS301", day: "Thursday", startTime: "14:00", endTime: "15:30", room: "Room 201" }
];

// Mock meetings
export const meetings = [
  {
    id: 1, 
    title: "Curriculum Review",
    description: "Meeting to discuss updates to the Computer Science curriculum",
    date: "2023-05-30",
    startTime: "10:00",
    endTime: "12:00",
    participants: "All Faculty",
    attendees: [1, 2, 3]
  },
  {
    id: 2, 
    title: "Research Progress",
    description: "Meeting to review ongoing research projects in the department",
    date: "2023-06-02",
    startTime: "14:00",
    endTime: "16:00",
    participants: "Selected Faculty",
    attendees: [1, 2]
  },
  {
    id: 3, 
    title: "Faculty Evaluation",
    description: "Annual faculty performance evaluation meeting",
    date: "2023-06-10",
    startTime: "11:00",
    endTime: "13:00",
    participants: "All Faculty",
    attendees: [1, 2, 3, 4, 5]
  }
];

// Mock certificate requests
export const certificateRequests = [
  {
    id: "CERT-2023-001",
    requesterName: "Rajesh Kumar",
    organization: "ABC University",
    semester: 8,
    examDate: "2023-05-28",
    studentCount: 45,
    requestDate: "2023-05-20",
    certificateType: "Examination Certificate",
    reason: "End semester examination for external students",
    status: "Pending"
  },
  {
    id: "CERT-2023-002",
    requesterName: "Priya Singh",
    organization: "XYZ College",
    semester: 6,
    examDate: "2023-05-26",
    studentCount: 30,
    requestDate: "2023-05-15",
    certificateType: "Participation Certificate",
    reason: "Workshop on Advanced Programming Techniques",
    status: "Approved"
  },
  {
    id: "CERT-2023-003",
    requesterName: "Amit Verma",
    organization: "DEF Institute",
    semester: 4,
    examDate: "2023-05-24",
    studentCount: 25,
    requestDate: "2023-05-10",
    certificateType: "Course Completion",
    reason: "Certificate for students who completed the short course",
    status: "Rejected",
    rejectionReason: "Insufficient details provided"
  }
];

// Stats for dashboard
export const stats = {
  facultyCount: 24,
  studentCount: 312,
  certificateRequestsCount: 3,
  upcomingMeetingsCount: 5
};

// Semesters
export const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

// Notice categories
export const noticeCategories = [
  "All Notices",
  "Examination",
  "Meeting",
  "Registration",
  "Admission",
  "General"
];

// Certificate types
export const certificateTypes = [
  "Examination Certificate",
  "Participation Certificate",
  "Course Completion"
];

// Get days of week
export const getDaysOfWeek = () => {
  return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
};
