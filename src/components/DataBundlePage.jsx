import React from 'react';
import CategoryBillCheckout from './CategoryBillCheckout';

export default function DataBundlePage({ onBalanceUpdate }) {
  return (
    <CategoryBillCheckout
      groupKey="DATA_BUNDLE"
      serviceCode="data"
      pageTitle="Data Bundles"
      pageSubtitle="Purchase mobile internet data plans"
      customerLabel="Phone Number"
      customerPlaceholder="e.g. 08012345678"
      requiresValidation={false}
      showQuickAmounts={false}
      onBalanceUpdate={onBalanceUpdate}
    />
  );
}