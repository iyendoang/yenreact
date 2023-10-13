import React, { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import Api from "../../services/Api";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";

export default function Login() {
  document.title = "Login - SIDOEL";

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    password: "",
    email: "",
    message: "",
  });

  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await Api.post("/api/login", {
        email: email,
        password: password,
      });

      Cookies.set("token", response.data.token);
      Cookies.set("user", JSON.stringify(response.data.user));
      Cookies.set("permissions", JSON.stringify(response.data.permissions));

      toast.success("Login Successfully!", {
        position: "bottom-right",
        duration: 4000,
      });

      // redirect to dashboard page
      navigate("/admin/dashboard");
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        const emailError =
          errorData.errors && errorData.errors.email
            ? errorData.errors.email[0]
            : "";
        const passwordError =
          errorData.errors && errorData.errors.password
            ? errorData.errors.password[0]
            : "";

        setErrors({
          email: emailError,
          password: passwordError,
          message: errorData.message ? errorData.message : "",
        });

        if (errorData.message) {
          toast.error(errorData.message, {
            position: "bottom-right",
            duration: 4000,
          });
        }
      } else {
        toast.error("Login Failed. Please try again.", {
          position: "bottom-right",
          duration: 4000,
        });
      }
    }
  };

  if (Cookies.get("token")) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm className="row g-3 needs-validation" noValidate>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">
                      Sign In to your account
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => {
                          if (errors.email) {
                            setErrors({
                              ...errors,
                              email: "",
                            });
                          }
                          setEmail(e.target.value);
                        }}
                        placeholder="Email"
                        autoComplete="email"
                        invalid={errors.email ? true : false}
                        feedback={errors.email ? errors.email : ""}
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => {
                          if (errors.password) {
                            setErrors({
                              ...errors,
                              password: "",
                            });
                          }
                          setPassword(e.target.value);
                        }}
                        placeholder="******"
                        autoComplete="password"
                        invalid={errors.password ? true : false}
                        feedback={errors.password ? errors.password : ""}
                        required
                      />
                    </CInputGroup>
                    <CButton color="primary" className="px-4" onClick={login}>
                      Login
                    </CButton>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <Link to="/register">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}
