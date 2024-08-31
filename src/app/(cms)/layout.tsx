import { ReactElement } from "react";
import AuthProtected from "../(provider)/AuthProtected";

export default function Layout({ children }: { children: ReactElement }) {
  return <AuthProtected>{children}</AuthProtected>;
}
