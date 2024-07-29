interface Prop {
  children: React.ReactNode;
}
export function Section({ children }: Prop) {
  return <div className="min-h-screen">{children}</div>;
}
