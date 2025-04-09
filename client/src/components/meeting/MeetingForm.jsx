import { useState } from 'react';
import { useSelector } from 'react-redux';

const MeetingForm = () => {
  const { isLogin, role } = useSelector(state => state.user);

  const [meeting, setMeeting] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    selectedFaculty: [],
    allFaculty: false,
    meetingType: 'physical',
    location: ''
  });
  
  const faculty = [
    { id: 1, name: 'Dr. Smith', department: 'Computer Science' },
    { id: 2, name: 'Prof. Johnson', department: 'Mathematics' },
    { id: 3, name: 'Dr. Patel', department: 'Physics' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeeting(prev => ({ ...prev, [name]: value }));
  };

  const handleFacultyToggle = (id) => {
    setMeeting(prev => {
      const selectedFaculty = prev.selectedFaculty.includes(id)
        ? prev.selectedFaculty.filter(fid => fid !== id)
        : [...prev.selectedFaculty, id];
      return { ...prev, selectedFaculty };
    });
  };

  const handleAllFacultyToggle = (e) => {
    const checked = e.target.checked;
    setMeeting(prev => ({
      ...prev,
      allFaculty: checked,
      selectedFaculty: checked ? faculty.map(f => f.id) : []
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!meeting.title || !meeting.date || !meeting.startTime || !meeting.endTime) {
      alert("Please fill all required fields.");
      return;
    }

    if (meeting.selectedFaculty.length === 0) {
      alert("Please select at least one faculty member.");
      return;
    }

    if (meeting.startTime >= meeting.endTime) {
      alert("Start time must be before end time.");
      return;
    }

    console.log("Meeting Scheduled", meeting);
    alert("Meeting has been scheduled successfully.");

    setMeeting({
      title: '',
      description: '',
      date: '',
      startTime: '',
      endTime: '',
      selectedFaculty: [],
      allFaculty: false,
      meetingType: 'physical',
      location: ''
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Schedule New Meeting</h2>
      <div className="mb-4 text-sm text-gray-600">
        <span className="font-medium">Logged in as:</span> <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">{role}</span>
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
            {meeting.meetingType === 'physical' ? 'Meeting Room' : 'Meeting Link'}
          </label>
          <input 
            type="text" 
            name="location" 
            value={meeting.location} 
            onChange={handleChange} 
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
            placeholder={meeting.meetingType === 'physical' ? 'Room 101' : 'https://meet.example.com/abc-xyz'}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Select Faculty *</label>
          <div className="flex items-center mb-2">
            <input 
              type="checkbox" 
              id="selectAll"
              checked={meeting.allFaculty} 
              onChange={handleAllFacultyToggle} 
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="selectAll" className="ml-2 text-sm text-gray-700">Select All Faculty</label>
          </div>

          <div className="border border-gray-200 rounded-md p-3 max-h-60 overflow-y-auto">
            {faculty.map(f => (
              <div key={f.id} className="flex items-center py-2">
                <input
                  type="checkbox"
                  id={`faculty-${f.id}`}
                  checked={meeting.selectedFaculty.includes(f.id)}
                  onChange={() => handleFacultyToggle(f.id)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor={`faculty-${f.id}`} className="ml-2 text-sm text-gray-700">
                  <span className="font-medium">{f.name}</span> - <span className="text-gray-500">{f.department}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <button 
            type="submit" 
            className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Schedule Meeting
          </button>
        </div>
      </form>
    </div>
  );
};

export default MeetingForm;
// import { useState } from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
// import { useToast } from '@/hooks/use-toast';
// import { faculty } from '../../data/mockData';

// const MeetingForm = () => {
//   const { toast } = useToast();
//   const [meeting, setMeeting] = useState({
//     title: '',
//     description: '',
//     date: '',
//     startTime: '',
//     endTime: '',
//     selectedFaculty: [],
//     allFaculty: false,
//     meetingType: 'physical',
//     location: ''
//   });
  
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setMeeting(prev => ({ ...prev, [name]: value }));
//   };
  
//   const handleFacultyToggle = (id) => {
//     setMeeting(prev => {
//       const selectedFaculty = [...prev.selectedFaculty];
//       if (selectedFaculty.includes(id)) {
//         return { ...prev, selectedFaculty: selectedFaculty.filter(fid => fid !== id) };
//       } else {
//         return { ...prev, selectedFaculty: [...selectedFaculty, id] };
//       }
//     });
//   };
  
//   const handleAllFacultyToggle = (checked) => {
//     setMeeting(prev => ({
//       ...prev, 
//       allFaculty: checked,
//       selectedFaculty: checked ? faculty.map(f => f.id) : []
//     }));
//   };
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Validate
//     if (!meeting.title || !meeting.date || !meeting.startTime || !meeting.endTime) {
//       toast({
//         title: "Error",
//         description: "Please fill all required fields",
//         variant: "destructive"
//       });
//       return;
//     }
    
//     if (meeting.selectedFaculty.length === 0) {
//       toast({
//         title: "Error",
//         description: "Please select at least one faculty member",
//         variant: "destructive"
//       });
//       return;
//     }
    
//     // Check if start time is before end time
//     if (meeting.startTime >= meeting.endTime) {
//       toast({
//         title: "Error",
//         description: "Start time must be before end time",
//         variant: "destructive"
//       });
//       return;
//     }
    
//     // In a real app, this would send data to an API
//     // Here we just show a success message
//     toast({
//       title: "Success",
//       description: "Meeting has been scheduled successfully",
//     });
    
//     // Reset form
//     setMeeting({
//       title: '',
//       description: '',
//       date: '',
//       startTime: '',
//       endTime: '',
//       selectedFaculty: [],
//       allFaculty: false,
//       meetingType: 'physical',
//       location: ''
//     });
//   };
  
//   return (
//     <Card className="overflow-hidden mb-6">
//       <CardContent className="p-0">
//         <div className="p-4 border-b border-gray-200">
//           <h2 className="text-lg font-semibold text-primary">Schedule New Meeting</h2>
//         </div>
//         <div className="p-4">
//           <form onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//               <div>
//                 <Label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Meeting Title</Label>
//                 <Input 
//                   type="text" 
//                   id="title" 
//                   name="title"
//                   value={meeting.title}
//                   onChange={handleChange}
//                   placeholder="Enter meeting title" 
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary" 
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Meeting Date</Label>
//                 <Input 
//                   type="date" 
//                   id="date" 
//                   name="date"
//                   value={meeting.date}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary" 
//                 />
//               </div>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//               <div>
//                 <Label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">Start Time</Label>
//                 <Input 
//                   type="time" 
//                   id="startTime" 
//                   name="startTime"
//                   value={meeting.startTime}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary" 
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">End Time</Label>
//                 <Input 
//                   type="time" 
//                   id="endTime" 
//                   name="endTime"
//                   value={meeting.endTime}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary" 
//                 />
//               </div>
//             </div>
            
//             <div className="mb-4">
//               <Label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Meeting Description</Label>
//               <Textarea 
//                 id="description" 
//                 name="description"
//                 value={meeting.description}
//                 onChange={handleChange}
//                 rows="3" 
//                 placeholder="Enter meeting details"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary" 
//               />
//             </div>
            
//             <div className="mb-4">
//               <Label htmlFor="meetingType" className="block text-sm font-medium text-gray-700 mb-1">Meeting Type</Label>
//               <div className="flex space-x-4">
//                 <div className="flex items-center">
//                   <input 
//                     type="radio" 
//                     id="physical" 
//                     name="meetingType"
//                     value="physical"
//                     checked={meeting.meetingType === 'physical'}
//                     onChange={handleChange}
//                     className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300" 
//                   />
//                   <label htmlFor="physical" className="ml-2 text-sm text-gray-700">Physical</label>
//                 </div>
//                 <div className="flex items-center">
//                   <input 
//                     type="radio" 
//                     id="virtual" 
//                     name="meetingType"
//                     value="virtual"
//                     checked={meeting.meetingType === 'virtual'}
//                     onChange={handleChange}
//                     className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300" 
//                   />
//                   <label htmlFor="virtual" className="ml-2 text-sm text-gray-700">Virtual</label>
//                 </div>
//               </div>
//             </div>
            
//             <div className="mb-4">
//               <Label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
//                 {meeting.meetingType === 'physical' ? 'Meeting Room' : 'Meeting Link'}
//               </Label>
//               <Input 
//                 type="text" 
//                 id="location" 
//                 name="location"
//                 value={meeting.location}
//                 onChange={handleChange}
//                 placeholder={meeting.meetingType === 'physical' ? 'e.g. Conference Room 101' : 'e.g. Zoom/Google Meet link'} 
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary" 
//               />
//             </div>
            
//             <div className="mb-4">
//               <div className="flex items-center mb-2">
//                 <Label className="text-sm font-medium text-gray-700">Select Faculty Members</Label>
//                 <div className="ml-auto">
//                   <div className="flex items-center">
//                     <Checkbox 
//                       id="all-faculty"
//                       checked={meeting.allFaculty}
//                       onCheckedChange={handleAllFacultyToggle}
//                       className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
//                     />
//                     <label htmlFor="all-faculty" className="ml-2 text-sm text-gray-700">
//                       Select All Faculty
//                     </label>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="border border-gray-200 rounded-md p-3 max-h-48 overflow-y-auto">
//                 {faculty.map(f => (
//                   <div key={f.id} className="flex items-center mb-2 last:mb-0">
//                     <Checkbox 
//                       id={`faculty-${f.id}`}
//                       checked={meeting.selectedFaculty.includes(f.id)}
//                       onCheckedChange={() => handleFacultyToggle(f.id)}
//                       className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
//                     />
//                     <label htmlFor={`faculty-${f.id}`} className="ml-2 text-sm text-gray-700">
//                       {f.name} ({f.department})
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             <div className="flex justify-end">
//               <Button type="submit" className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
//                 <i className="fas fa-calendar-plus mr-1"></i> Schedule Meeting
//               </Button>
//             </div>
//           </form>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default MeetingForm;
