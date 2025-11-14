import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllUsers } from "@/lib/data";
import { format, parseISO } from 'date-fns';

export default async function AdminDashboard() {
  const users = await getAllUsers();

  const isUserOnline = (lastLogin: string | null) => {
    if (!lastLogin) return false;
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    return parseISO(lastLogin) > thirtyMinutesAgo;
  };

  const formatLastLogin = (lastLogin: string | null) => {
    if (!lastLogin) return 'Never';
    return format(parseISO(lastLogin), "PPP p");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Admin Dashboard</CardTitle>
        <CardDescription>
          Manage all users across the eStores WorkHub platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-primary hover:bg-primary">
              <TableHead className="text-primary-foreground">Status</TableHead>
              <TableHead className="text-primary-foreground hidden md:table-cell">Name</TableHead>
              <TableHead className="text-primary-foreground">Email</TableHead>
              <TableHead className="text-primary-foreground hidden lg:table-cell">Phone</TableHead>
              <TableHead className="text-primary-foreground">Role</TableHead>
              <TableHead className="text-primary-foreground hidden md:table-cell">Last Login</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  {isUserOnline(user.last_login) ? (
                     <Badge className="bg-green-500 text-white">Online</Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-gray-200">Offline</Badge>
                  )}
                </TableCell>
                <TableCell className="font-medium hidden md:table-cell">{user.name} {user.surname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="hidden lg:table-cell">{user.phone}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-primary text-primary">{user.role}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{formatLastLogin(user.last_login)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
