import '../globals.css';

export const metadata = {
  title: "UBDT Utkarsh 2k26 - Coming Soon",
  description: "Utkarsh 2k26 is launching soon. Stay tuned for updates on our social media handles for further updates!",
};

export default function ComingSoonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        header, footer { display: none !important; }
      `}</style>
      <div className="min-h-screen">
        {children}
      </div>
    </>
  );
}
