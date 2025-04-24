import React, { useState } from "react";
import MemberHOD from "../components/member/MemberHOD";
import MemberFaculty from "../components/member/MemberFaculty";
import MemberStudent from "../components/member/MemberStudent";
import MemberExternal from "../components/member/MemberExternal";
import { ShieldCheck, Users2, GraduationCap, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const RenderComponent = ({ display }) => {
  switch (display) {
    case "hod":
      return <MemberHOD />;
    case "faculty":
      return <MemberFaculty />;
    case "student":
      return <MemberStudent />;
    default:
      return <MemberExternal />;
  }
};

const roleOptions = [
  {
    key: "hod",
    label: "HOD",
    color: "bg-blue-500",
    icon: <ShieldCheck className="w-5 h-5" />,
  },
  {
    key: "faculty",
    label: "Faculty",
    color: "bg-green-500",
    icon: <Users2 className="w-5 h-5" />,
  },
  {
    key: "student",
    label: "Student",
    color: "bg-yellow-500",
    icon: <GraduationCap className="w-5 h-5" />,
  },
  {
    key: "external",
    label: "External",
    color: "bg-gray-500",
    icon: <UserCheck className="w-5 h-5" />,
  },
];

const MemberPages = () => {
  const [display, setDisplay] = useState("hod");

  return (
    <>
      <motion.div
        className="flex items-center justify-between px-8 py-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold">Members</h1>
      </motion.div>
      <motion.div
        className="flex flex-col md:flex-row gap-6 w-full px-8"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div className="w-full md:w-4/5" variants={itemVariants}>
          <RenderComponent display={display} />
        </motion.div>
        <motion.div
          className="md:w-1/5 flex flex-row md:flex-col gap-4"
          variants={itemVariants}
        >
          {roleOptions.map((role) => (
            <motion.div
              key={role.key}
              onClick={() => setDisplay(role.key)}
              className={`cursor-pointer flex items-center justify-center gap-2 text-white font-semibold p-4 rounded-xl shadow-md transition-all duration-200 hover:scale-[1.02] ${
                display === role.key ? "ring-4 ring-offset-2 ring-white" : ""
              } ${role.color}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={itemVariants}
            >
              {role.icon}
              {role.label}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
};

export default MemberPages;