import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSession } from "@/lib/actions";

export default async function IndustryDashboard() {
  const session = await getSession();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Industry Dashboard</CardTitle>
        <CardDescription>
          Welcome to the eStores WorkHub for Industry Partners.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Hello, <span className="font-semibold">{session?.email}</span>. Access partnership resources and manage collaboration opportunities here.</p>
      </CardContent>
    </Card>
  );
}
