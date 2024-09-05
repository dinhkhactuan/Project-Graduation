"use client";
import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginOAuth2 } from "@/service/store/auth/auth.api";
import { RootState } from "@/service/store/reducers";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object().shape({
  userName: Yup.string().required("Please input your username!"),
  userPassword: Yup.string().required("Please input your password!"),
  role: Yup.string().required("Please select a role!"),
});

const initialValues = {
  userName: "",
  userPassword: "",
  role: "admin",
};

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token, loginSuccess } = useSelector((state: RootState) => state.auth);

  const onSubmit = (
    values: typeof initialValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    dispatch(loginOAuth2(values) as any);
    setSubmitting(false);
  };

  useEffect(() => {
    if (token) {
      router.push("/cms/dashboard");
    }
  }, [token]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          width: "100%",
          minWidth: "350px",
          padding: "40px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Đăng nhập hệ thống
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div style={{ marginBottom: "15px" }}>
                <label
                  htmlFor="role"
                  style={{ display: "block", marginBottom: "5px" }}
                >
                  Vai trò
                </label>
                <Field
                  as="select"
                  name="role"
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #d9d9d9",
                    borderRadius: "4px",
                  }}
                >
                  <option style={{ cursor: "pointer" }} value="admin">
                    Admin
                  </option>
                  <option style={{ cursor: "pointer" }} value="nhà quảng cáo">
                    Nhà Quảng Cáo
                  </option>
                </Field>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label
                  htmlFor="userName"
                  style={{ display: "block", marginBottom: "5px" }}
                >
                  Username
                </label>
                <Field
                  type="text"
                  name="userName"
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #d9d9d9",
                    borderRadius: "4px",
                  }}
                />
                <ErrorMessage
                  name="userName"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label
                  htmlFor="userPassword"
                  style={{ display: "block", marginBottom: "5px" }}
                >
                  Password
                </label>
                <Field
                  type="password"
                  name="userPassword"
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #d9d9d9",
                    borderRadius: "4px",
                  }}
                />
                <ErrorMessage
                  name="userPassword"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#1890ff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
