// Format date in readable format: May 25, 2023
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Format time: convert 24h to 12h format
export const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${ampm}`;
};

// Format time range
export const formatTimeRange = (startTime, endTime) => {
  return `${formatTime(startTime)} - ${formatTime(endTime)}`;
};

// Get days of the week
export const getDaysOfWeek = () => {
  return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
};

// Get hours for timetable
export const getTimeSlots = () => {
  return [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];
};

// Create a PDF placeholder
export const createPdfPlaceholder = (title) => {
  return {
    name: `${title.toLowerCase().replace(/\s+/g, '_')}.pdf`,
    type: 'application/pdf',
    size: Math.floor(Math.random() * 1000000) + 500000 // Random size between 500KB and 1.5MB
  };
};

// Generate unique ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Filter array by search term
export const filterBySearchTerm = (array, searchTerm, fields) => {
  if (!searchTerm.trim()) return array;
  
  const lowercasedTerm = searchTerm.toLowerCase();
  return array.filter(item => {
    return fields.some(field => {
      const value = item[field];
      return value && value.toString().toLowerCase().includes(lowercasedTerm);
    });
  });
};

// Sort array by field
export const sortByField = (array, field, direction = 'asc') => {
  return [...array].sort((a, b) => {
    if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
    if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

// Group routines by day
export const groupRoutinesByDay = (routines) => {
  const days = getDaysOfWeek();
  const grouped = {};
  
  days.forEach(day => {
    grouped[day] = routines.filter(routine => routine.day === day);
  });
  
  return grouped;
};

// Find class for a specific time slot and day
export const findClassForTimeSlot = (routines, day, timeSlot) => {
  return routines.find(routine => 
    routine.day === day && 
    routine.startTime <= timeSlot && 
    routine.endTime > timeSlot
  );
};

// Utility function for combining class names
export const cn = (...args) => {
  return args.filter(Boolean).join(' ');
};
