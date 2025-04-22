
import { useRef } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useAppSelector } from '@/redux/hooks';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { motion } from 'framer-motion';

const generateUsersData = () => [
  { name: 'Active', value: Math.floor(Math.random() * 1000) + 2000 },
  { name: 'Inactive', value: Math.floor(Math.random() * 500) + 500 },
  { name: 'New', value: Math.floor(Math.random() * 300) + 200 },
];

export function UsersChart() {
  const { isDarkMode } = useAppSelector(state => state.theme);
  const data = useRef(generateUsersData());
  
  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))'];

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full h-[400px]"
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle>User Breakdown</CardTitle>
          <CardDescription>Distribution of users by status</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.current}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={40}
                paddingAngle={5}
                dataKey="value"
              >
                {data.current.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDarkMode ? "hsl(var(--card))" : "white", 
                  borderColor: "hsl(var(--border))",
                  color: isDarkMode ? "white" : "black"
                }}
                formatter={(value) => [`${value} Users`, undefined]}
              />
              <Legend formatter={(value) => <span style={{ color: isDarkMode ? 'white' : 'black' }}>{value}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
