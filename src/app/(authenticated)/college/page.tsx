import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSession } from "@/lib/actions";

export default async function CollegeDashboard() {
  const session = await getSession();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">College Dashboard</CardTitle>
        <CardDescription>
          Welcome to the eStores WorkHub for College Partners.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Hello, <span className="font-semibold">{session?.email}</span>. Manage your institution's partnership details and student progress here.</p>
      </CardContent>
    </Card>
  );
}
