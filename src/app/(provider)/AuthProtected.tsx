"use client";
import { KEYS_STORAGE } from "@/service/host";
import { getDataCookie } from "@/shared/utils/ultils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthProtected = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const token = getDataCookie(KEYS_STORAGE.USER_TOKEN);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token]);
  return <>{children}</>;
};
export default AuthProtected;
