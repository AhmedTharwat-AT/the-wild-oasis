import { styled } from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  // 1- load authenticated user
  const { isLoading, isAuth } = useUser();

  // 2- if no auth user , redirect to login page
  useEffect(() => {
    if (!isAuth && !isLoading) {
      navigate("/login");
    }
    // 3. if user is auth and trys to go to login page navigate him to dashboard
    if (isAuth && location.pathname === "/login") {
      navigate("/dashboard");
    }
  }, [isAuth, isLoading, navigate, location.pathname]);

  // 4- while loading , show spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  return <div>{children}</div>;
}

export default ProtectedRoute;
