import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Settings, LogOut } from 'lucide-react';

type Props = {
  session: { user: { name: string } };
  handleLogout: () => void;
};

export function DashboardDesktopNavigation({ session, handleLogout }: Props) {
  return (
    <nav className="hidden md:flex items-center gap-8 ml-8 flex-1 justify-end">
      <span className="text-sm text-muted-foreground hidden sm:inline-block">
        Welcome, {session.user.name}
      </span>
      <Button variant="ghost" size="sm" asChild>
        <Link href="/settings" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span className="hidden sm:inline">Settings</span>
        </Link>
      </Button>
      <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center gap-2">
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:inline">Logout</span>
      </Button>
    </nav>
  );
}
