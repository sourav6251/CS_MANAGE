
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown, ArrowUp } from 'lucide-react';

export function StatCard({ title, value, icon: Icon, change, trend, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {typeof value === 'number' && title.includes('Revenue') 
              ? `$${value.toLocaleString()}` 
              : value.toLocaleString()}
          </div>
          {trend && change !== undefined && (
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              {trend === 'up' && <ArrowUp className="h-3 w-3 text-green-500" />}
              {trend === 'down' && <ArrowDown className="h-3 w-3 text-red-500" />}
              <span className={trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : ''}>
                {change > 0 ? '+' : ''}{change}%
              </span>
              <span>from last month</span>
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
