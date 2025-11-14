import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSession } from "@/lib/actions";

export default async function EmployeeDashboard() {
  const session = await getSession();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Employee Dashboard</CardTitle>
        <CardDescription>
          Welcome back to the eStores WorkHub!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Hello, <span className="font-semibold">{session?.email}</span>. This is your personal dashboard. All your tools and information are available here.</p>
      </CardContent>
    </Card>
  );
}
