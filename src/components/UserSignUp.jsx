import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaLock, 
  FaGlobeAfrica, 
  FaArrowRight, 
  FaCheckCircle, 
  FaExclamationCircle 
} from "react-icons/fa";
import { Fade, Zoom } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";
import { Context } from "./Context";
import Swal from 'sweetalert2'

const UserSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {api_url}=useContext(Context);

  // Local states for management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    confirmEmail: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage(""); // Reset error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    // Basic frontend safety validations before posting
    if (formData.email !== formData.confirmEmail) {
      setErrorMessage("Emails do not match.");
      setLoading(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      // Modify URL to target your actual backend setup route
      const response = await fetch(`${api_url}/user_signup.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSuccessMessage(result.message);

        Swal.fire({text:"Account Created, Please Login", icon:"success"})
        navigate('/userlogin')
        // // Auto dispatching fake/returned initial token and credentials right into redux slice
        // dispatch(userLogin({
        //   userInfo: { name: formData.name, email: formData.email, phone: formData.phone },
        //   userToken: "sample-jwt-token-from-auth-pipeline" 
        // }));


        // Reset form variables
        setFormData({ name: "", email: "", confirmEmail: "", phone: "", password: "", confirmPassword: "" });
      } else {
        setErrorMessage(result.error || "An unexpected error occurred.");
      }
    } catch (error) {
      setErrorMessage("Unable to bridge connectivity with authentication nodes.");
    } finally {
      setLoading(false);
      
    }
  };

  return (
    <SignupContainer>
      <SplitWrapper>
        {/* LEFT MARKETING SIDE */}
        <MarketingPanel>
          <Fade triggerOnce>
            <Logo href="/">
              <FaGlobeAfrica size={22} /> ELEXDON<span>CONNECT</span>
            </Logo>
            <h2>One Identity. Infinite Access.</h2>
            <p>Access high-throughput utility clearings, corporate identity registries, and immediate borderless value pipelines on Nigeria's most reliable stack.</p>
            <FeatureList>
              <FeatureItem><FaCheckCircle size={14} color="#10b981"/> Encrypted Core Profile Nodes</FeatureItem>
              <FeatureItem><FaCheckCircle size={14} color="#10b981"/> Immediate Ecosystem Enrollment</FeatureItem>
              <FeatureItem><FaCheckCircle size={14} color="#10b981"/> Tier-1 Architecture Access</FeatureItem>
            </FeatureList>
          </Fade>
        </MarketingPanel>

        {/* RIGHT SIGNUP FORM SIDE */}
        <FormPanel>
          <Zoom triggerOnce>
            <FormWrapper onSubmit={handleSubmit}>
              <FormTitleHeader>
                <h3>Create Account</h3>
                <p>Register securely in under 60 seconds.</p>
              </FormTitleHeader>

              {/* DYNAMIC ALERT BANNER ENGINE */}
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

              {/* NAME FIELD */}
              <InputGroupField>
                <label htmlFor="name">Full Name</label>
                <InputWrapperInner>
                  <FaUser className="input-icon" />
                  <input type="text" id="name" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
                </InputWrapperInner>
              </InputGroupField>

              {/* EMAIL FIELDS CONTAINER */}
              <TwinGridRow>
                <InputGroupField>
                  <label htmlFor="email">Email Address</label>
                  <InputWrapperInner>
                    <FaEnvelope className="input-icon" />
                    <input type="email" id="email" name="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required />
                  </InputWrapperInner>
                </InputGroupField>
                <InputGroupField>
                  <label htmlFor="confirmEmail">Confirm Email</label>
                  <InputWrapperInner>
                    <FaEnvelope className="input-icon" />
                    <input type="email" id="confirmEmail" name="confirmEmail" placeholder="john@example.com" value={formData.confirmEmail} onChange={handleChange} required />
                  </InputWrapperInner>
                </InputGroupField>
              </TwinGridRow>

              {/* PHONE NUMBER FIELD */}
              <InputGroupField>
                <label htmlFor="phone">Phone Number</label>
                <InputWrapperInner>
                  <FaPhone className="input-icon" />
                  <input type="tel" id="phone" name="phone" placeholder="08012345678" value={formData.phone} onChange={handleChange} required />
                </InputWrapperInner>
              </InputGroupField>

              {/* PASSWORD FIELDS CONTAINER */}
              <TwinGridRow>
                <InputGroupField>
                  <label htmlFor="password">Password</label>
                  <InputWrapperInner>
                    <FaLock className="input-icon" />
                    <input type="password" id="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required minLength="6" />
                  </InputWrapperInner>
                </InputGroupField>
                <InputGroupField>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <InputWrapperInner>
                    <FaLock className="input-icon" />
                    <input type="password" id="confirmPassword" name="confirmPassword" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} required minLength="6" />
                  </InputWrapperInner>
                </InputGroupField>
              </TwinGridRow>

              {/* CONVERSION SUBMIT MECHANISM */}
              <SubmitButton type="submit" disabled={loading}>
                {loading ? "Authorizing Security Node..." : <>Initialize Account <FaArrowRight /></>}
              </SubmitButton>

              <FormFooterRoute>
                Already registered? <a href="/userlogin">Login</a>
              </FormFooterRoute>
            </FormWrapper>
          </Zoom>
        </FormPanel>
      </SplitWrapper>
    </SignupContainer>
  );
};

export default UserSignup;

/* -------------------------------------------------------------------------- */
/* STYLED COMPONENTS SCHEMES (CRISP LIGHT DESIGN SYSTEM)                     */
/* (CRITICAL CONSTRAINT: MAX 10PX APPLIED TO ALL GAPS, MARGINS, PADDINGS)  */
/* -------------------------------------------------------------------------- */

const SignupContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f8fafc; /* Dynamic crisp light background */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px; /* Locked at rigid constraint */
  box-sizing: border-box;
  font-family: system-ui, -apple-system, sans-serif;
`;

const SplitWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 10px; /* Locked at rigid constraint */
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 10px; /* Locked at rigid constraint */
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.02);

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const MarketingPanel = styled.div`
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border: 1px solid #bfdbfe;
  border-radius: 10px;
  padding: 10px; /* Locked at rigid constraint */
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px; /* Locked at rigid constraint */

  h2 {
    margin: 0;
    font-size: clamp(1.5rem, 3vw, 2.2rem);
    font-weight: 800;
    color: #1e3a8a;
    letter-spacing: -0.02em;
    line-height: 1.1;
  }

  p {
    margin: 0;
    font-size: 13px;
    color: #1e40af;
    line-height: 1.5;
  }

  @media (max-width: 820px) {
    display: none; /* Optimized screen management on small environments */
  }
`;

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

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px; /* Safe space margin mapping under 10px limit */
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #1d4ed8;
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

const InputWrapperInner = styled.div`
  display: flex;
  align-items: center;
  background: #f8fafc;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  padding: 4px 10px; /* Bounded internal ecosystem padding */
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

const TwinGridRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px; /* Locked at rigid constraint */

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
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
  transition: opacity 0.15s ease, transform 0.15s ease;

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