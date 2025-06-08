export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full flex items-center justify-center min-h-screen bg-gray-200 p-5">
      {children}
    </main>
  );
}
