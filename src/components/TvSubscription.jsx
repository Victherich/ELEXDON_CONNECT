import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { FaTv, FaWallet, FaReceipt } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { Context } from './Context';

// // --- Styled Components (with 10px margins/gaps) ---
// const Container = styled.div`
//   max-width: 500px; margin: 10px auto; padding: 20px; 
//   background: #fff; border-radius: 12px; 
//   box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #eee;
// `;

// Replace your existing Container styled-component with this:
const Container = styled.div`
  width: 100%; padding: 20px; 
  background: #fff; border-radius: 12px; 
  box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #eee;
  box-sizing: border-box; /* Ensures padding doesn't break layout */
`;
const Input = styled.input`width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 8px; box-sizing: border-box;`;
const Select = styled.select`width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 8px;`;
const Button = styled.button`width: 100%; padding: 10px; background: #6366f1; color: white; border: none; border-radius: 8px; cursor: pointer; margin-top: 10px;`;
const ServiceLabel = styled.h3`text-align: center; color: #333; margin: 10px 0;`;

const TvSubscription = ({ serviceID, serviceName }) => {
    const { api_url, user, fetchUserProfileById } = useContext(Context);
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({ billersCode: '', phone: '', variation_code: '', amount: 0 });
    const [customer, setCustomer] = useState(null);
    const [variations, setVariations] = useState([]);

    const handleVerify = async () => {
        if (!form.billersCode) return Swal.fire('Error', 'Enter Smartcard/Decoder Number', 'error');
        Swal.showLoading();
        const res = await fetch(`${api_url}/verify_tv.php`, { 
            method: 'POST', 
            body: JSON.stringify({ billersCode: form.billersCode, serviceID }) 
        });
        const json = await res.json();
        console.log(json)
        Swal.close();
        if (json.code === '000') {
            setCustomer(json.content);
            const varRes = await fetch(`${api_url}/get_tv_variations.php?serviceID=${serviceID}`);
            const varData = await varRes.json();
            setVariations(varData.content.varations || []);
            setStep(2);
        } else { Swal.fire('Error', 'Verification Failed', 'error'); }
    };

    const handlePay = async () => {
        Swal.fire({ title: 'Processing...', allowOutsideClick: false });
        Swal.showLoading();
        const res = await fetch(`${api_url}/purchase_tv.php`, { 
            method: 'POST', 
            body: JSON.stringify({ userId: user.id, ...form, serviceID }) 
        });
        const json = await res.json();
        console.log(json)
        if (json.success) {
            Swal.fire('Success', 'Subscription Successful!', 'success');
            fetchUserProfileById();
            setStep(1); setForm({ billersCode: '', phone: '', variation_code: '', amount: 0 });
        } else { Swal.fire('Failed', json.error, 'error'); }
    };

    return (
        <Container>
            <ServiceLabel>{serviceName} Subscription</ServiceLabel>
            {step === 1 ? (
                <>
                    <Input placeholder="Smartcard/Decoder Number" onChange={(e) => setForm({...form, billersCode: e.target.value})} />
                    <Input placeholder="Phone Number" onChange={(e) => setForm({...form, phone: e.target.value})} />
                    <Button onClick={handleVerify}>Verify Account</Button>
                </>
            ) : (
                <>
                    <p>Customer: <strong>{customer?.Customer_Name}</strong></p>
                    <Select onChange={(e) => {
                        const sel = variations.find(v => v.variation_code === e.target.value);
                        setForm({...form, variation_code: e.target.value, amount: sel?.variation_amount});
                    }}>
                        <option>Select Bouquet</option>
                        {variations.map(v => <option key={v.variation_code} value={v.variation_code}>{v.name} (₦{v.variation_amount})</option>)}
                    </Select>
                    <Button onClick={handlePay}>Pay ₦{form.amount}</Button>
                    <Button style={{background: '#ef4444'}} onClick={() => setStep(1)}>Cancel</Button>
                </>
            )}
        </Container>
    );
};

export default TvSubscription;