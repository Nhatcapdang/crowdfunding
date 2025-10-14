import Header from "@/components/header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-laptop mx-auto">
      <Header />
      {children}
    </div>
  );
}
