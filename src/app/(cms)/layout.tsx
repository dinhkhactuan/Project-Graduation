import { ReactElement } from "react";
import AuthProtected from "../(provider)/AuthProtected";

export default function Layout({
  children,
}: {
  children: ReactElement | null;
}) {
  return <AuthProtected>{children}</AuthProtected>;
}
