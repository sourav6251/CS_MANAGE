import React from 'react';
import { 
  Users, GraduationCap, Briefcase, UserCheck, UserCog, 
  Award, Shield, UserPlus, UserX 
} from 'lucide-react';
import MemberExternal from './MemberExternal';
import MemberFaculty from './MemberFaculty';
import MemberStudent from './MemberStudent';
import MemberHOD from './MemberHOD';

const MemberSection = () => {
  const memberStats = {
    students: { total: 1245, active: 1189, new: 56 },
    faculty: { total: 84, active: 79, onLeave: 5 },
    external: { total: 42, active: 38, pending: 4 },
    hods: { total: 12, active: 11, onDuty: 9 }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {/* HOD Card */}
      <MemberCard 
        title="Department Heads"
        description="Heads of Department"
        icon={Shield}
        gradientFrom="from-amber-500"
        gradientTo="to-amber-600"
        stats={memberStats.hods}
        statItems={[
          { icon: UserCog, value: 'total', label: 'Total' },
          { icon: UserCheck, value: 'active', label: 'Active', color: 'green' },
          { icon: Award, value: 'onDuty', label: 'On Duty', color: 'purple' }
        ]}
        additionalInfo={[
          { color: 'amber', text: 'Administrative privileges' },
          { color: 'blue', text: 'Department leadership' }
        ]}
      >
        <MemberHOD />
      </MemberCard>

      {/* Student Card */}
      <MemberCard 
        title="Student Members"
        description="Department of Computer Science"
        icon={GraduationCap}
        gradientFrom="from-blue-500"
        gradientTo="to-blue-600"
        stats={memberStats.students}
        statItems={[
          { icon: Users, value: 'total', label: 'Total' },
          { icon: UserCheck, value: 'active', label: 'Active', color: 'green' },
          { icon: UserPlus, value: 'new', label: 'New', color: 'blue' }
        ]}
      >
        <MemberStudent />
      </MemberCard>

      {/* Faculty Card */}
      <MemberCard 
        title="Faculty Members"
        description="Teaching Staff & Researchers"
        icon={Briefcase}
        gradientFrom="from-purple-500"
        gradientTo="to-purple-600"
        stats={memberStats.faculty}
        statItems={[
          { icon: Users, value: 'total', label: 'Total' },
          { icon: UserCheck, value: 'active', label: 'Active', color: 'green' },
          { icon: UserX, value: 'onLeave', label: 'On Leave', color: 'amber' }
        ]}
      >
        <MemberFaculty />
      </MemberCard>

      {/* External Card */}
      <MemberCard 
        title="External Members"
        description="Collaborators & Guests"
        icon={Users}
        gradientFrom="from-emerald-500"
        gradientTo="to-emerald-600"
        stats={memberStats.external}
        statItems={[
          { icon: Users, value: 'total', label: 'Total' },
          { icon: UserCheck, value: 'active', label: 'Active', color: 'green' },
          { icon: UserX, value: 'pending', label: 'Pending', color: 'yellow' }
        ]}
      >
        <MemberExternal />
      </MemberCard>
    </div>
  );
};

// Reusable MemberCard component
const MemberCard = ({ 
  title, 
  description, 
  icon: Icon, 
  gradientFrom, 
  gradientTo, 
  stats, 
  statItems, 
  additionalInfo, 
  children 
}) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} p-4 text-white`}>
        <div className="flex items-center gap-3">
          <Icon className="w-6 h-6" />
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <div className="mt-2 text-sm opacity-90">{description}</div>
      </div>
      <div className="p-5">
        {children}
        <div className="grid grid-cols-3 gap-2 mt-4 text-center">
          {statItems.map((item, index) => (
            <StatBadge 
              key={index}
              icon={item.icon}
              value={stats[item.value]}
              label={item.label}
              color={item.color}
            />
          ))}
        </div>
        {additionalInfo && (
          <div className="mt-4 text-sm text-gray-600">
            {additionalInfo.map((info, index) => (
              <p key={index} className="flex items-center gap-2 mt-1 first:mt-0">
                <span className={`w-2 h-2 rounded-full bg-${info.color}-500`}></span>
                <span>{info.text}</span>
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// StatBadge component
const StatBadge = ({ icon: Icon, value, label, color = 'gray' }) => {
  const colorClasses = {
    gray: 'bg-gray-100 text-gray-800',
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    amber: 'bg-amber-100 text-amber-800',
    purple: 'bg-purple-100 text-purple-800'
  };

  return (
    <div className={`${colorClasses[color]} p-2 rounded-lg`}>
      <div className="flex items-center justify-center gap-1">
        <Icon className="w-4 h-4" />
        <span className="font-semibold">{value}</span>
      </div>
      <div className="text-xs mt-1">{label}</div>
    </div>
  );
};

export default MemberSection;