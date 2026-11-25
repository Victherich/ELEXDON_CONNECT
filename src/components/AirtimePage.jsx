import React from 'react';
import CategoryBillCheckout from './CategoryBillCheckout';

export default function AirtimePage({ onBalanceUpdate }) {
  return (
    <CategoryBillCheckout
      groupKey="AIRTIME"
      serviceCode="airtime"
      pageTitle="Airtime Top-Up"
      pageSubtitle="Instant mobile airtime recharge across providers"
      customerLabel="Phone Number"
      customerPlaceholder="e.g. 08012345678"
      requiresValidation={false}
      showQuickAmounts={true}
      onBalanceUpdate={onBalanceUpdate}
    />
  );
}