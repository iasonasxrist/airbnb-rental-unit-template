
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useProperty } from "@/contexts/PropertyContext";
import { Button } from "@/components/ui/button";

// Sample data - in a real app, this would come from your database
const monthlyData = [
  { month: "Jan", revenue: 3500, expenses: 1200, profit: 2300 },
  { month: "Feb", revenue: 3200, expenses: 1100, profit: 2100 },
  { month: "Mar", revenue: 4100, expenses: 1300, profit: 2800 },
  { month: "Apr", revenue: 4800, expenses: 1500, profit: 3300 },
  { month: "May", revenue: 5200, expenses: 1800, profit: 3400 },
  { month: "Jun", revenue: 5800, expenses: 2000, profit: 3800 },
];

// Sample data for expense breakdown
const expenseData = [
  { name: "Cleaning", value: 2500 },
  { name: "Maintenance", value: 3200 },
  { name: "Supplies", value: 1400 },
  { name: "Utilities", value: 2700 },
  { name: "Taxes", value: 3800 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

// Sample data for property comparison
const propertyData = [
  {
    name: "Beach House",
    revenue: 14500,
    expenses: 5200,
    occupancy: 85,
  },
  {
    name: "City Apartment",
    revenue: 12800,
    expenses: 4100,
    occupancy: 78,
  },
  {
    name: "Mountain Cabin",
    revenue: 9200,
    expenses: 3600,
    occupancy: 65,
  },
];

// Property mapping for ID to name lookup
const properties = [
  { id: "1", name: "Beach House" },
  { id: "2", name: "City Apartment" },
  { id: "3", name: "Mountain Cabin" },
];

const Reports = () => {
  const [timeframe, setTimeframe] = useState("6months");
  const { propertyId } = useParams();
  const { selectedProperty, hasSelectedProperty, setSelectedProperty } = useProperty();
  const navigate = useNavigate();

  // Handle URL property ID
  useEffect(() => {
    if (propertyId) {
      const property = properties.find(p => p.id === propertyId);
      if (property) {
        setSelectedProperty(property.name, propertyId);
      }
    }
    
    if (!hasSelectedProperty && !propertyId) {
      navigate("/properties");
    }
  }, [propertyId, setSelectedProperty, hasSelectedProperty, navigate]);

  // If no property is selected, show a message prompting the user to select one
  if (!hasSelectedProperty && !propertyId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-6">
        <h2 className="text-2xl font-semibold mb-2">Please Select a Property</h2>
        <p className="text-muted-foreground mb-6">
          You need to select a property to view reports.
        </p>
        <Button onClick={() => navigate("/properties")}>
          Go to Properties Page
        </Button>
      </div>
    );
  }

  // Filter data for the selected property
  const filteredMonthlyData = selectedProperty === "all" 
    ? monthlyData 
    : monthlyData.map(item => ({...item, revenue: item.revenue * 0.7, expenses: item.expenses * 0.7, profit: item.profit * 0.7}));

  const filteredExpenseData = selectedProperty === "all"
    ? expenseData
    : expenseData.map(item => ({...item, value: item.value * 0.7}));

  const filteredPropertyData = selectedProperty === "all"
    ? propertyData
    : propertyData.filter(p => p.name === selectedProperty);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Reports {selectedProperty !== "all" ? `for ${selectedProperty}` : ""}
        </h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Timeframe:</span>
          <Select
            value={timeframe}
            onValueChange={(value) => setTimeframe(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Expenses</CardTitle>
            <CardDescription>
              Monthly breakdown of revenue and expenses
              {selectedProperty !== "all" ? ` for ${selectedProperty}` : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={filteredMonthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, ""]} />
                  <Legend />
                  <Bar dataKey="revenue" fill="#0EA5E9" name="Revenue" />
                  <Bar dataKey="expenses" fill="#F97316" name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profit Trend</CardTitle>
            <CardDescription>
              Monthly profit analysis
              {selectedProperty !== "all" ? ` for ${selectedProperty}` : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={filteredMonthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, "Profit"]} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="profit"
                    stroke="#10B981"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
            <CardDescription>
              Distribution of expenses by category
              {selectedProperty !== "all" ? ` for ${selectedProperty}` : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={filteredExpenseData}
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
                    {filteredExpenseData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`$${value}`, "Amount"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {selectedProperty === "all" && (
          <Card>
            <CardHeader>
              <CardTitle>Property Comparison</CardTitle>
              <CardDescription>
                Performance metrics across properties
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={propertyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#0EA5E9" />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke="#8884d8"
                    />
                    <Tooltip />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="revenue"
                      fill="#0EA5E9"
                      name="Revenue"
                    />
                    <Bar
                      yAxisId="left"
                      dataKey="expenses"
                      fill="#F97316"
                      name="Expenses"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="occupancy"
                      stroke="#8884d8"
                      name="Occupancy %"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}
        
        {selectedProperty !== "all" && (
          <Card>
            <CardHeader>
              <CardTitle>Occupancy Rate</CardTitle>
              <CardDescription>
                Monthly occupancy rate for {selectedProperty}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { month: "Jan", occupancy: 65 },
                      { month: "Feb", occupancy: 70 },
                      { month: "Mar", occupancy: 75 },
                      { month: "Apr", occupancy: 80 },
                      { month: "May", occupancy: 85 },
                      { month: "Jun", occupancy: 90 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, "Occupancy"]} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="occupancy"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Reports;
