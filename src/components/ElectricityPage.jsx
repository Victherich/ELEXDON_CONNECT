import React from 'react';
import CategoryBillCheckout from './CategoryBillCheckout';

export default function ElectricityPage({ onBalanceUpdate }) {
  return (
    <CategoryBillCheckout
      groupKey="ELECTRICITY"
      serviceCode="electricity"
      pageTitle="Electricity Bills"
      pageSubtitle="Verify meter number and buy prepaid tokens or pay postpaid bills"
      customerLabel="Meter Number"
      customerPlaceholder="Enter meter number"
      requiresValidation={true}
      showQuickAmounts={true}
      onBalanceUpdate={onBalanceUpdate}
    />
  );
}