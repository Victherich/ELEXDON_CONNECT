// import React, { useEffect, useState, useContext } from "react";
// import styled, { keyframes } from "styled-components";
// import Swal from "sweetalert2";
// import PaystackPop from "@paystack/inline-js";
// import { useNavigate } from "react-router-dom"; 
// import { Context } from "./Context"; // Linked directly to your context system

// /* ===================== STYLES ===================== */
// const spin = keyframes`
//   0% { transform: rotate(0deg); }
//   100% { transform: rotate(360deg); }
// `;

// const Container = styled.div`
//   min-height: 100vh;
//   background: #f6f9ff;
//   padding: 10px;
//   display: flex;
//   justify-content: center;
//   box-sizing: border-box;
// `;

// const Card = styled.div`
//   width: 100%;
//   max-width: 700px;
//   background: #fff;
//   border-radius: 12px;
//   padding: 15px;
//   box-shadow: 0 4px 12px rgba(0,0,0,0.05);
//   border: 1px solid #e2e8f0;
//   height: fit-content;
// `;

// const Title = styled.h1`
//   font-size: 1.6rem;
//   color: #2563eb;
//   margin: 0 0 4px 0;
//   font-weight: 800;
// `;

// const Subtitle = styled.p`
//   font-size: 13px;
//   color: #64748b;
//   margin: 0 0 15px 0;
// `;

// const InputWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 6px;
//   margin-top: 10px;
// `;

// const InputLabel = styled.label`
//   font-size: 11px;
//   font-weight: 700;
//   text-transform: uppercase;
//   color: #475569;
//   letter-spacing: 0.03em;
// `;

// const NumericInputField = styled.input`
//   width: 100%;
//   padding: 12px;
//   font-size: 16px;
//   font-weight: 700;
//   border: 1px solid #cbd5e1;
//   border-radius: 8px;
//   color: #0f172a;
//   outline: none;
//   box-sizing: border-box;
//   background: #f8fafc;
  
//   &:focus {
//     border-color: #2563eb;
//     background: #ffffff;
//   }
// `;

// const PriceBox = styled.div`
//   background: #eff6ff;
//   padding: 12px;
//   border-radius: 8px;
//   margin-top: 10px;
//   font-weight: 700;
//   color: #1e40af;
//   border: 1px dashed #bfdbfe;
//   font-size: 15px;
// `;

// const Button = styled.button`
//   width: 100%;
//   padding: 12px;
//   margin-top: 10px;
//   border: none;
//   border-radius: 8px;
//   cursor: pointer;
//   font-weight: 700;
//   background: #2563eb;
//   color: #fff;
//   font-size: 14px;
//   transition: background 0.15s ease;

//   &:hover {
//     background: #1d4ed8;
//   }
//   &:disabled {
//     background: #94a3b8;
//     cursor: not-allowed;
//   }
// `;

// const SecondaryButton = styled.button`
//   width: 100%;
//   padding: 12px;
//   margin-top: 8px;
//   border: 1px solid #cbd5e1;
//   border-radius: 8px;
//   cursor: pointer;
//   font-weight: 600;
//   background: #fff;
//   color: #475569;
//   font-size: 13px;
//   transition: background 0.15s ease;

//   &:hover {
//     background: #f8fafc;
//   }
// `;

// const Box = styled.div`
//   margin-top: 15px;
//   padding: 12px;
//   border-radius: 8px;
//   background: #f8fbff;
//   border: 1px solid #e6f0ff;
//   h3 {
//     color: #2563eb;
//     margin: 0 0 6px 0;
//     font-size: 14px;
//   }
//   p {
//     font-size: 12px;
//     color: #475569;
//     line-height: 1.5;
//     margin: 0;
//   }
//   h2 {
//     margin: 10px 0;
//     color: #0f172a;
//   }
// `;

// const Spinner = styled.div`
//   border: 4px solid #e2e8f0;
//   border-top: 4px solid #2563eb;
//   width: 36px;
//   height: 36px;
//   border-radius: 50%;
//   animation: ${spin} 1s linear infinite;
//   margin: 10px auto;
// `;

// const Center = styled.div`
//   text-align: center;
// `;

// /* ===================== PAGE COMPONENT ===================== */
// const FundWalletPage = () => {
//   const { user } = useContext(Context);
//   const navigate = useNavigate();

//   const [amountInput, setAmountInput] = useState("2000");
//   const [status, setStatus] = useState("idle"); // idle | pending | verifying | success
//   const [countdown, setCountdown] = useState(0);
//   const [verifyDisplay, setVerifyDisplay] = useState("Verifying Payment...");
//   const [redirectCountdown, setRedirectCountdown] = useState(5);

//   /* ===================== INIT PAYMENT ===================== */
//   const startPayment = (currency) => {
//     const email = user?.email;
//     const fundingAmount = parseFloat(amountInput);

//     if (!email) {
//       Swal.fire("Identity Missing", "Please log into your dashboard session profile first.", "error");
//       return;
//     }

//     if (isNaN(fundingAmount) || fundingAmount < 100) {
//       Swal.fire("Validation Error", "Minimum wallet funding baseline target is ₦100.00", "warning");
//       return;
//     }

//     const verificationNumber = Date.now() + "VX" + Math.floor(Math.random() * 999999);

//     const pendingPayload = {
//       email,
//       currency,
//       amount: fundingAmount,
//       status: "pending",
//       verificationNumber,
//       createdAt: new Date().toISOString(),
//     };

//     localStorage.setItem("wallet_funding_payment", JSON.stringify(pendingPayload));
//     setStatus("pending");

//     setTimeout(() => {
//       startPolling(verificationNumber);
//     }, 3000);

//     const paystack = new PaystackPop();

//     paystack.newTransaction({
//       key: "pk_live_afb3375b9a770a5a332904dcf1a26e77c2a5f170", // Keeping your core profile key assignment unchanged
//       email,
//       amount: fundingAmount * 100, // Convert to kobo
//       currency,
//       metadata: {
//         custom_payment_type: verificationNumber,
//         user_id: user?.id
//       },

//       onSuccess: () => {
//         setStatus("verifying");
//         startPolling(verificationNumber);
//       },

//       onCancel: () => {
//         Swal.fire("Cancelled", "Payment interaction window dismissed.", "error");
//         setStatus("idle");
//         localStorage.removeItem("wallet_funding_payment");
//       },
//     });
//   };

//   /* ===================== RELATIONAL DB POLLING ===================== */
//   const startPolling = (verificationNumber) => {
//     let attempts = 0;
//     const maxAttempts = 20; 
//     const intervalTime = 5000;

//     setCountdown(100);
//     setStatus("verifying");

//     const intervalId = setInterval(async () => {
//       attempts++;

//       try {
//         // Fetch endpoint matching your project PHP tracking configurations
//         const response = await fetch(`api/verify_wallet_topup.php?ref=${verificationNumber}&userId=${user?.id || 0}`);
//         const data = await response.json();

//         if (data?.success && data?.status === "success") {
//           clearInterval(intervalId);
//           setVerifyDisplay("Crediting Dashboard Wallet Balance...");

//           setStatus("success");
//           localStorage.removeItem("wallet_funding_payment");

//           let seconds = 5;
//           setRedirectCountdown(seconds);

//           const redirectTimer = setInterval(() => {
//             seconds--;
//             setRedirectCountdown(seconds);

//             if (seconds <= 0) {
//               clearInterval(redirectTimer);
//               navigate("/userdashboard/overview"); // Route safely back to main portal screen
//             }
//           }, 1000);

//           return;
//         }

//         if (attempts >= maxAttempts) {
//           clearInterval(intervalId);
//           Swal.fire(
//             "Still Processing",
//             "We are processing your transfer confirm queues. If debited, click manual verify or look up balance logs later.",
//             "info"
//           );
//           setStatus("idle");
//         }
//       } catch (err) {
//         // Prevent interface from crashing during intermittent connection blips
//         console.error("Network synchronization waiting cycle execution...");
//       }
//     }, intervalTime);
//   };

//   /* ===================== RESUME CYCLE FOR POWER RESILIENCE ===================== */
//   useEffect(() => {
//     const saved = localStorage.getItem("wallet_funding_payment");
//     if (saved) {
//       const parsed = JSON.parse(saved);
//       if (parsed?.amount) setAmountInput(parsed.amount.toString());
//       setStatus("verifying");
//       startPolling(parsed.verificationNumber);
//     }
//   }, [user]);

//   /* ===================== MANUAL RE-VERIFY TRIGGER ===================== */
//   const confirmManual = () => {
//     const saved = localStorage.getItem("wallet_funding_payment");
//     if (!saved) return Swal.fire("No active verification session record context found.");

//     const { verificationNumber } = JSON.parse(saved);
//     setStatus("verifying");
//     startPolling(verificationNumber);
//   };

//   const cancelVerification = () => {
//     setStatus("idle");
//     localStorage.removeItem("wallet_funding_payment");
//   };

//   return (
//     <Container>
//       <Card>
//         <Title>Fund Wallet</Title>
//         <Subtitle>Deposit funds securely into your ELEXDON CONNECT transaction balance.</Subtitle>

//         {status === "idle" && (
//           <InputWrapper>
//             <InputLabel>Specify Top-up Amount (NGN)</InputLabel>
//             <NumericInputField
//               type="number"
//               placeholder="Enter amount (e.g. 5000)"
//               value={amountInput}
//               min="100"
//               onChange={(e) => setAmountInput(e.target.value)}
//             />
//           </InputWrapper>
//         )}

//         {parseFloat(amountInput) > 0 && (
//           <PriceBox>
//             Total Credit Payload: ₦{parseFloat(amountInput).toLocaleString(undefined, { minimumFractionDigits: 2 })}
//           </PriceBox>
//         )}

//         {/* ================= VERIFICATION STATE PANEL ================= */}
//         {status === "verifying" && (
//           <Box>
//             <Center>
//               <Spinner />
//               <h3>{verifyDisplay}</h3>
//               <p>Please keep this screen open while we secure payment status synchronization loops...</p>
//               <Button onClick={confirmManual}>I Have Completed Payment</Button>
//               <SecondaryButton onClick={cancelVerification}>Cancel Verification</SecondaryButton>
//             </Center>
//           </Box>
//         )}

//         {/* ================= SUCCESS DISPATCH DISPLAY ================= */}
//         {status === "success" && (
//           <Box style={{ background: "#f0fdf4", borderColor: "#bbf7d0" }}>
//             <h2 style={{ color: "#16a34a", margin: "0 0 4px 0" }}>🎉 Funding Complete</h2>
//             <p style={{ color: "#166534" }}>Your Elexdon Connect portfolio account has been credited instantly.</p>
//             <h3 style={{ color: "#15803d", marginTop: "10px" }}>
//               Redirecting to main matrix console in {redirectCountdown}s...
//             </h3>
//           </Box>
//         )}

//         {/* ================= INSTRUCTIONS FOOTER GUIDE ================= */}
//         {status === "idle" && (
//           <Box>
//             <h3>Payment Method Choice Information</h3>
//             <p>
//               <b>BANK TRANSFERS:</b> Copy the dynamic temporary account routing sequence shown inside the secure Paystack pop-up, complete the debit action using your bank app, then return to this view interface to confirm verification.
//             </p>
//           </Box>
//         )}

//         {/* ================= CTA GATE TRIGGER DISPATCH BUTTONS ================= */}
//         {status !== "success" && status !== "verifying" && (
//           <Button 
//             disabled={!amountInput || parseFloat(amountInput) < 100} 
//             onClick={() => startPayment("NGN")}
//           >
//             Proceed with Paystack (₦{parseFloat(amountInput || 0).toLocaleString()})
//           </Button>
//         )}
//       </Card>
//     </Container>
//   );
// };

// export default FundWalletPage;





import React, { useState, useContext } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import PaystackPop from "@paystack/inline-js";
import { useNavigate } from "react-router-dom";
import { Context } from "./Context"; 

const FundWalletPage = () => {
  const { user, fetchUserProfileById, api_url } = useContext(Context);
  const navigate = useNavigate();
  const [amountInput, setAmountInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInstantPayment = () => {
    const email = user?.email;
    const fundingAmount = parseFloat(amountInput);

    if (!email) {
      Swal.fire("Identity Missing", "Please log into your account first.", "error");
      return;
    }

    if (isNaN(fundingAmount) || fundingAmount < 100) {
      Swal.fire("Validation Error", "Minimum top-up target is ₦100.00", "warning");
      return;
    }

    setLoading(true);
    const generatedReference = "ELX" + Date.now() + Math.floor(Math.random() * 999);

    const paystack = new PaystackPop();

    paystack.newTransaction({
        //  key: "pk_test_60e1f53bba7c80b60029bf611a26a66a9a22d4e4",
      key: "pk_live_3626fe7772aaca28a10724ebb1f9727dfcc5d6cb",
      email,
      amount: fundingAmount * 100, // Convert to Kobo
      currency: "NGN",
      ref: generatedReference,

      onSuccess: async (transaction) => {
        // transaction contains details like { reference: "..." } returned by PaystackPop
        Swal.fire({
          title: "Processing...",
          text: "Updating your wallet balances, please stay on the line.",
          allowOutsideClick: false,
          didOpen: () => { Swal.showLoading(); }
        });

        try {
          const response = await fetch(`${api_url}/save_direct_payment.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: user?.id || 0,
              reference: transaction.reference || generatedReference,
              amount: fundingAmount,
              service: "Wallet Top-up"
            }),
          });

          const data = await response.json();

          if (data.success) {
            Swal.fire("Wallet Funded", `₦${fundingAmount.toLocaleString()} has been added.`, "success");
            navigate("/userdashboard/overview");
            fetchUserProfileById()
          } else {
            Swal.fire("Database Alert", data.error || "Payment was successful but backend failed to update.", "warning");
          }
        } catch (err) {
          Swal.fire("Network Error", "Unable to establish contact with backend ledger system.", "error");
        } finally {
          setLoading(false);
        }
      },

      onCancel: () => {
        setLoading(false);
        Swal.fire("Cancelled", "Payment interaction window dismissed.", "info");
      },
    });
  };

  return (
    <Container>
      <Card>
        <Title>Quick Fund Wallet</Title>
        <Subtitle>Enter an amount below to top up your ELEXDON CONNECT account balances instantly.</Subtitle>

        <InputWrapper>
          <InputLabel>Specify Top-up Amount (NGN)</InputLabel>
          <NumericInputField
            type="number"
            placeholder="Enter amount (e.g. 5000)"
            value={amountInput}
            disabled={loading}
            onChange={(e) => setAmountInput(e.target.value)}
          />
        </InputWrapper>

        <Button 
          disabled={loading || !amountInput || parseFloat(amountInput) < 100} 
          onClick={handleInstantPayment}
        >
          {loading ? "Initializing Secure Gateway..." : `Pay Now (₦${parseFloat(amountInput || 0).toLocaleString()})`}
        </Button>
      </Card>
    </Container>
  );
};

export default FundWalletPage;

/* ===================== STYLED ARCHITECTURE COMPONENTS ===================== */
const Container = styled.div`
  min-height: 80vh;
  background: #f6f9ff;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const Card = styled.div`
  width: 100%;
  max-width: 500px;
  background: #ffffff;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  border: 1px solid #e2e8f0;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #2563eb;
  margin: 0 0 4px 0;
  font-weight: 800;
`;

const Subtitle = styled.p`
  font-size: 13px;
  color: #64748b;
  margin: 0 0 15px 0;
  line-height: 1.4;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const InputLabel = styled.label`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: #475569;
  letter-spacing: 0.03em;
`;

const NumericInputField = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: 700;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  color: #0f172a;
  outline: none;
  box-sizing: border-box;
  background: #f8fafc;
  
  &:focus {
    border-color: #2563eb;
    background: #ffffff;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  background: #2563eb;
  color: #fff;
  font-size: 14px;
  transition: background 0.15s ease;

  &:hover { background: #1d4ed8; }
  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
  }
`;