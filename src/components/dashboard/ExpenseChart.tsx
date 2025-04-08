
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { useState, useEffect } from "react";

// Sample data - in a real app, this would come from your database
const allExpenseData = {
  "1": [
    { name: "Cleaning", value: 350 },
    { name: "Maintenance", value: 500 },
    { name: "Supplies", value: 150 },
    { name: "Utilities", value: 450 },
    { name: "Taxes", value: 600 },
  ],
  "2": [
    { name: "Cleaning", value: 300 },
    { name: "Maintenance", value: 250 },
    { name: "Supplies", value: 200 },
    { name: "Utilities", value: 300 },
    { name: "Taxes", value: 400 },
  ],
  "3": [
    { name: "Cleaning", value: 250 },
    { name: "Maintenance", value: 300 },
    { name: "Supplies", value: 100 },
    { name: "Utilities", value: 250 },
    { name: "Taxes", value: 350 },
  ],
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

interface ExpenseChartProps {
  propertyId?: string | null;
}

export function ExpenseChart({ propertyId }: ExpenseChartProps) {
  const [data, setData] = useState(allExpenseData["1"]);

  useEffect(() => {
    if (propertyId && allExpenseData[propertyId as keyof typeof allExpenseData]) {
      setData(allExpenseData[propertyId as keyof typeof allExpenseData]);
    } else {
      // Default data if no property is selected
      setData(allExpenseData["1"]);
    }
  }, [propertyId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`$${value}`, "Amount"]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
