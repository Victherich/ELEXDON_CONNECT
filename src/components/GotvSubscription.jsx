import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { FaTv, FaWallet, FaReceipt, FaCircleCheck, FaXmark, FaSpinner } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { Context } from './Context';

// --- Styled Components ---
const Container = styled.div`max-width: 500px; margin: 2rem auto; padding: 2rem; background: #fff; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border: 1px solid #f0f0f0;`;
const Title = styled.h2`color: #1f2937; text-align: center; margin-bottom: 1.5rem;`;
const Input = styled.input`width: 100%; padding: 12px; margin-bottom: 1rem; border: 2px solid #e5e7eb; border-radius: 10px; box-sizing: border-box;`;
const Select = styled.select`width: 100%; padding: 12px; margin-bottom: 1rem; border: 2px solid #e5e7eb; border-radius: 10px; background: white;`;
const Button = styled.button`width: 100%; padding: 12px; background: ${props => props.secondary ? '#ef4444' : '#6366f1'}; color: white; border: none; border-radius: 10px; font-weight: 700; cursor: pointer; margin-top: 0.5rem;`;
const Summary = styled.div`background: #f9fafb; padding: 1rem; border-radius: 10px; margin-bottom: 1rem; font-size: 0.9rem;`;

const GotvSubscription = () => {
    const { api_url, user, fetchUserProfileById } = useContext(Context);
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({ billersCode: '', phone: '', variation_code: '', amount: 0, variation_name: '' });
    const [customer, setCustomer] = useState(null);
    const [variations, setVariations] = useState([]);

    const handleVerify = async () => {
        if (!form.billersCode) return Swal.fire('Error', 'Enter Smartcard Number', 'error');
        Swal.showLoading();
        const res = await fetch(`${api_url}/verify_gotv.php`, { method: 'POST', body: JSON.stringify({ billersCode: form.billersCode, serviceID: 'gotv' }) });
        const json = await res.json();
        Swal.close();
        if (json.code === '000') {
            setCustomer(json.content);
            const varRes = await fetch(`${api_url}/get_gotv_variations.php`);
            const varData = await varRes.json();
            setVariations(varData.content.varations || []);
            setStep(2);
        } else { Swal.fire('Error', 'Invalid Smartcard', 'error'); }
    };

    const handlePay = async () => {
        Swal.fire({ title: 'Processing...', allowOutsideClick: false });
        Swal.showLoading();
        const res = await fetch(`${api_url}/purchase_gotv.php`, { method: 'POST', body: JSON.stringify({ userId: user.id, ...form, serviceID: 'gotv' }) });
        const json = await res.json();
        if (json.success) {
            Swal.fire('Success', 'Subscription Applied!', 'success');
            fetchUserProfileById();
            setStep(1); setForm({ billersCode: '', phone: '', variation_code: '', amount: 0 });
        } else { Swal.fire('Failed', json.error, 'error'); }
    };

    return (
        <Container>
            <Title><FaTv /> GOtv Subscription</Title>
            {step === 1 ? (
                <>
                    <Input placeholder="Smartcard Number" onChange={(e) => setForm({...form, billersCode: e.target.value})} />
                    <Input placeholder="Phone Number" onChange={(e) => setForm({...form, phone: e.target.value})} />
                    <Button onClick={handleVerify}>Verify Account</Button>
                </>
            ) : (
                <Summary>
                    <p>Name: <strong>{customer?.Customer_Name}</strong></p>
                    <Select onChange={(e) => {
                        const sel = variations.find(v => v.variation_code === e.target.value);
                        setForm({...form, variation_code: e.target.value, amount: sel?.variation_amount, variation_name: sel?.name});
                    }}>
                        <option>Select Bouquet</option>
                        {variations.map(v => <option key={v.variation_code} value={v.variation_code}>{v.name} (₦{v.variation_amount})</option>)}
                    </Select>
                    <Button onClick={handlePay}>Pay ₦{form.amount}</Button>
                    <Button secondary onClick={() => setStep(1)}>Cancel</Button>
                </Summary>
            )}
        </Container>
    );
};

export default GotvSubscription;