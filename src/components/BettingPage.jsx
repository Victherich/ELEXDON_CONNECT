import React from 'react';
import CategoryBillCheckout from './CategoryBillCheckout';

export default function BettingPage({ onBalanceUpdate }) {
  return (
    <CategoryBillCheckout
      groupKey="BETTING"
      serviceCode="betting"
      pageTitle="Betting Wallet Top-Up"
      pageSubtitle="Verify betting account ID and fund wallet instantly"
      customerLabel="Betting User ID / Account"
      customerPlaceholder="Enter betting account ID"
      requiresValidation={true}
      showQuickAmounts={true}
      onBalanceUpdate={onBalanceUpdate}
    />
  );
}