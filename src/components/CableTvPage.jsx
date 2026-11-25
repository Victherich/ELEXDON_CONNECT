
import React from 'react';
import CategoryBillCheckout from './CategoryBillCheckout';

export default function CableTvPage({ onBalanceUpdate }) {
  return (
    <CategoryBillCheckout
      groupKey="CABLE_TV"
      serviceCode="cable"
      pageTitle="Cable TV Subscriptions"
      pageSubtitle="Verify smartcard/IUC number and renew TV packages"
      customerLabel="Smartcard / IUC Number"
      customerPlaceholder="Enter smartcard or IUC number"
      requiresValidation={true}
      showQuickAmounts={false}
      onBalanceUpdate={onBalanceUpdate}
    />
  );
}