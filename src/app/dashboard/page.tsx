import { redirect } from 'next/navigation';

export default function DashboardRedirect() {
  // Redirect to root where the dashboard UI actually lives in this app
  redirect('/');
}