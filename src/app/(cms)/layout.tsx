import AuthProtected from "../(provider)/AuthProtected";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthProtected>{children}</AuthProtected>;
}
