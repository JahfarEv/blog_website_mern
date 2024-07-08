import { useContext, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Alert,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
const VerifyEmail = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useState();
  const navigate = useNavigate();
  const { authUser } = useAuthContext();

  const emailToken = localStorage.getItem("emailToken")
  console.log(authUser);
  console.log(emailToken);

  useEffect(() => {
    async () => {
      if (user?.isVerified) {
        setTimeout(() => {
          return navigate("/");
        }, 3000);
      } else {
        if (emailToken) {
          setLoading(true);

          const response = await axios.post(
            "http://localhost:4001/api/user/verify-email",
            JSON.stringify({ emailToken })
          );
          setLoading(false);
          console.log(response);
          if (response.error) {
            return setError(response);
          }
          updateUser(response);
        }
      }
    };
  });

  return(
  <div>
    {isLoading ? (
      <div>
        <CircularProgress />
      </div>
    ) : (
      <div>
        {user.isVerified ? (
          <div>
            <Alert severity="success">
              Email Successfully verified, redirecting...
            </Alert>
          </div>
        ) : (
          <div>
            {error.error ? (
              <Alert severity="error">{error.message}</Alert>
            ) : null}
          </div>
        )}
      </div>
    )}
  </div>
  )
};

export default VerifyEmail;
