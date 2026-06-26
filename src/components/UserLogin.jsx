import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { userLogin } from "../Features/Slice";
import { 
  FaEnvelope, 
  FaLock, 
  FaGlobeAfrica, 
  FaArrowRight, 
  FaCheckCircle, 
  FaExclamationCircle,
  FaShieldAlt
} from "react-icons/fa";
import { Fade, Zoom } from "react-awesome-reveal";
import { Context } from "./Context";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const {api_url}=useContext(Context);
const navigate =useNavigate()


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Point this URL to your live server location
      const response = await fetch(`${api_url}/user_login.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSuccessMessage("Authentication verified. Launching console...");
        
        // Dispatch data safely directly into the User auth slice state
        dispatch(userLogin({
          userInfo: result.user,
          userToken: result.token
        }));
        navigate('/userdashboard/overview')

        // Reset fields
        setFormData({ email: "", password: "" });
      } else {
        setErrorMessage(result.error || "Access denied.");
      }
    } catch (error) {
      setErrorMessage("System pipeline gateway connection error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <SplitWrapper>
        {/* LEFT BRAND SIDE PANEL */}
       <MarketingPanel>
  <Fade triggerOnce>
    <Logo href="/">
      <FaGlobeAfrica size={22} /> ELEXDON<span>CONNECT</span>
    </Logo>
    <h2>Welcome Back to Your Account</h2>
    <p>Sign in to manage your bills, process CAC registrations, print identity slips, and check your transactions instantly.</p>
    <SecurityBadgeGroup>
      <FaShieldAlt size={12} /> <span>100% Secure Login Session</span>
    </SecurityBadgeGroup>
  </Fade>
</MarketingPanel>

        {/* RIGHT INPUT AUTHENTICATION BOX */}
        <FormPanel>
          <Zoom triggerOnce>
            <FormWrapper onSubmit={handleSubmit}>
              <FormTitleHeader>
                <h3>Account Sign In</h3>
                <p>Provide your credentials.</p>
              </FormTitleHeader>

              {/* MESSAGING INFRASTRUCTURE SYSTEM BANNER */}
              {errorMessage && (
                <AlertBanner variant="error">
                  <FaExclamationCircle size={14} /> <span>{errorMessage}</span>
                </AlertBanner>
              )}
              {successMessage && (
                <AlertBanner variant="success">
                  <FaCheckCircle size={14} /> <span>{successMessage}</span>
                </AlertBanner>
              )}

              {/* EMAIL FIELD */}
              <InputGroupField>
                <label htmlFor="email">Email Address</label>
                <InputWrapperInner>
                  <FaEnvelope className="input-icon" />
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="name@domain.com" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                  />
                </InputWrapperInner>
              </InputGroupField>

              {/* PASSWORD FIELD */}
              <InputGroupField>
                <FlexLabelRow>
                  <label htmlFor="password">Security Password</label>
                  <a href="/forgot-password" class="forgot-link">Forgot?</a>
                </FlexLabelRow>
                <InputWrapperInner>
                  <FaLock className="input-icon" />
                  <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="••••••••" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                  />
                </InputWrapperInner>
              </InputGroupField>

              {/* SUBMISSION BUTTON TRIGGER */}
              <SubmitButton type="submit" disabled={loading}>
                {loading ? "Verifying Secure Signature..." : <>Access Profile Dashboard <FaArrowRight /></>}
              </SubmitButton>

              <FormFooterRoute>
                New to the platform? <a href="/usersignup">Sign up</a>
              </FormFooterRoute>
            </FormWrapper>
          </Zoom>
        </FormPanel>
      </SplitWrapper>
    </LoginContainer>
  );
};

export default UserLogin;

/* -------------------------------------------------------------------------- */
/* STYLED COMPONENTS SCHEMES (CRISP LIGHT DESIGN SYSTEM)                     */
/* (CRITICAL CONSTRAINT: MAX 10PX APPLIED TO ALL GAPS, MARGINS, PADDINGS)  */
/* -------------------------------------------------------------------------- */

const LoginContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f8fafc; /* Cohesive premium crisp light tint */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px; /* Locked at rigid constraint */
  box-sizing: border-box;
  font-family: system-ui, -apple-system, sans-serif;
`;

const SplitWrapper = styled.div`
  width: 100%;
  max-width: 900px;
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 10px; /* Locked at rigid constraint */
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 10px; /* Locked at rigid constraint */
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.02);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MarketingPanel = styled.div`
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); /* Divergent cool tint variant */
  border: 1px solid #bbf7d0;
  border-radius: 10px;
  padding: 10px; /* Locked at rigid constraint */
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px; /* Locked at rigid constraint */

  h2 {
    margin: 0;
    font-size: clamp(1.4rem, 2.5vw, 2rem);
    font-weight: 800;
    color: #14532d;
    letter-spacing: -0.02em;
    line-height: 1.15;
  }

  p {
    margin: 0;
    font-size: 13px;
    color: #15803d;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    display: none; 
  }
`

const Logo = styled.a`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
  font-weight: 900;
  color: #0f172a;
  text-decoration: none;
  letter-spacing: -0.03em;

  svg { color: #2563eb; }
  span {
    background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const SecurityBadgeGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  background: rgba(22, 163, 74, 0.1);
  color: #16a34a;
  font-size: 11px;
  font-weight: 700;
  padding: 6px 10px;
  border-radius: 4px;
`;

const FormPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px; /* Locked at rigid constraint */
`;

const FormWrapper = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px; /* Locked at rigid constraint */
`;

const FormTitleHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  h3 {
    margin: 0;
    font-size: clamp(1.3rem, 2.5vw, 1.8rem);
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.02em;
  }

  p {
    margin: 0;
    font-size: 13px;
    color: #64748b;
  }
`;

const InputGroupField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 12px;
    font-weight: 600;
    color: #334155;
  }
`;

const FlexLabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .forgot-link {
    font-size: 12px;
    color: #2563eb;
    text-decoration: none;
    font-weight: 500;
    
    &:hover { text-decoration: underline; }
  }
`;

const InputWrapperInner = styled.div`
  display: flex;
  align-items: center;
  background: #f8fafc;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  padding: 4px 10px; /* Strictly defined container internal pad bounds */
  gap: 8px;
  transition: border-color 0.15s ease, background-color 0.15s ease;

  &:focus-within {
    border-color: #2563eb;
    background: #ffffff;
  }

  .input-icon {
    color: #94a3b8;
    flex-shrink: 0;
  }

  input {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    font-size: 13px;
    color: #0f172a;
    padding: 6px 0;

    &::placeholder { color: #94a3b8; }
  }
`;

const AlertBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px; /* Locked at rigid constraint */
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.4;

  background: ${(props) => (props.variant === "error" ? "#fef2f2" : "#f0fdf4")};
  border: 1px solid ${(props) => (props.variant === "error" ? "#fca5a5" : "#86efac")};
  color: ${(props) => (props.variant === "error" ? "#b91c1c" : "#166534")};
`;

const SubmitButton = styled.button`
  border: none;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: #ffffff;
  font-weight: 600;
  font-size: 13px;
  padding: 10px; /* Locked at rigid constraint */
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: opacity 0.15s ease;

  &:hover { opacity: 0.95; }
  &:disabled {
    background: #cbd5e1;
    color: #94a3b8;
    cursor: not-allowed;
  }
`;

const FormFooterRoute = styled.p`
  margin: 0;
  font-size: 12px;
  color: #64748b;
  text-align: center;

  a {
    color: #2563eb;
    text-decoration: none;
    font-weight: 600;

    &:hover { text-decoration: underline; }
  }
`;