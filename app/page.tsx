import { redirect } from 'next/navigation';

// Root page: redirect to /quiz
export default function HomePage() {
  redirect('/quiz');
}
