interface Prop {
  children: React.ReactNode;
  onClick: () => void;
  className : string;
}
export function Button({ children, onClick , className  }: Prop) {
  return <button className={className} onClick={onClick}>{children}</button>;

}
