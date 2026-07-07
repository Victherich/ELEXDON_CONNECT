import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { 
  FaClockRotateLeft, 
  FaArrowLeft, 
  FaMagnifyingGlass, 
  FaFileInvoiceDollar 
} from 'react-icons/fa6';
import { Context } from './Context'; // Assumes user state context contains user index configs

const TransactionHistory = () => {
  const { user, api_url } = useContext(Context);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Replace with your exact PHP API routing pathway
    const fetchHistory = async () => {
      try {
        const response = await fetch(`${api_url}/get_transaction_history.php?userId=${user?.id || 0}`);
        const data = await response.json();
        if (data.success) {
          setTransactions(data.data);
        }
      } catch (error) {
        console.error("Error retrieving ledger records:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchHistory();
    }
  }, [user]);

  // Client side quick filter configuration mapping
  const filteredTransactions = transactions.filter(tx => 
    tx.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.recipient?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageWrapper>
      {/* HEADER SECTION ROW */}
      <HeaderNavigationBlock>
        <BackButton to="/userdashboard/overview">
          <FaArrowLeft size={12} />
          <span>Dashboard</span>
        </BackButton>
        <PageTitleBlock>
          <FaClockRotateLeft size={14} color="#64748b" />
          <h2>Service & Transaction History</h2>
        </PageTitleBlock>
      </HeaderNavigationBlock>

      {/* FILTER SEARCH DISPATCH INPUT ELEMENT */}
      <SearchBarContainer>
        <FaMagnifyingGlass size={12} color="#94a3b8" />
        <SearchInputField 
          type="text" 
          placeholder="Search by reference ID, service type or business name..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchBarContainer>

      {/* MAIN DATA SHEET INTERACTIVE CONTAINER */}
      <HistoryDataCard>
          <ScrollIndicatorBlock>
  <span>←</span>
  <span className="scroll-text">Scroll horizontally to view more columns</span>
  <span>→</span>
</ScrollIndicatorBlock>
        {loading ? (
          <FeedbackStateMessage>Loading tracking transaction ledgers...</FeedbackStateMessage>
        ) : filteredTransactions.length === 0 ? (
          <FeedbackStateMessage>No matching transaction metrics found profile records.</FeedbackStateMessage>
        ) : (
          <ResponsiveTableWrapper>
          
            <BaseTableStructure>
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Service Module</th>
                  <th>Slip</th>
                  <th>Recipient/Target</th>
                  <th>Amount</th>
                  <th>Initial Balance</th>
                  <th>Final Balance</th>
                  <th>Status</th>
                  <th>Date Requested</th>
                 <th>Response</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx, idx) => (
                  <tr key={tx.id || idx}>
                    <td className="ref-cell">{tx.reference}</td>
                    <td className="service-cell">
                      <ServiceInlineGroup>
                        <FaFileInvoiceDollar size={12} color="#2563eb" />
                        <span>{tx.service}</span>
                      </ServiceInlineGroup>
                    </td>
                    <td>
                      {tx.slip? tx.slip:"N/A"}
                    </td>
                    
                    <td>{tx.recipient || '—'}</td>
                    <td className="amount-cell">₦{parseFloat(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    <td>₦{parseFloat(tx.initial_balance).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    <td>₦{parseFloat(tx.final_balance).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    <td>
                      <StatusIndicatorBadge $status={tx.status}>
                        {tx.status}
                      </StatusIndicatorBadge>
                    </td>
                    <td className="date-cell">{tx.created_at}</td>
                    <td>{tx.response}</td>
                  </tr>
                ))}
              </tbody>
            </BaseTableStructure>
          </ResponsiveTableWrapper>
        )}
      </HistoryDataCard>
    </PageWrapper>
  );
};

export default TransactionHistory;

/* -------------------------------------------------------------------------- */
/* STYLED COMPONENTS DESIGN SCHEMAS (10PX BOUNDARY ALIGNED)                 */
/* -------------------------------------------------------------------------- */

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
  
`;

const HeaderNavigationBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 10px;
  gap: 10px;


  @media (max-width: 480px) {
    flex-direction: column-reverse; /* Stacks title on top, back button below */
    align-items: flex-start;
    
  }
`;

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 11px;
  font-weight: 700;
  color: #475569;
  text-decoration: none;
  transition: background 0.15s ease;

  &:hover { background: #e2e8f0; }
`;

const PageTitleBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  h2 {
    font-size: 14px;
    font-weight: 800;
    color: #0f172a;
    margin: 0;
  }
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 8px 12px;
`;

const SearchInputField = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 12px;
  color: #334155;
  &::placeholder { color: #94a3b8; }
`;

const HistoryDataCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 10px;
  min-height: 250px;
`;

const FeedbackStateMessage = styled.p`
  font-size: 12px;
  color: #64748b;
  text-align: center;
  margin-top: 40px;
  font-weight: 500;
`;

const ResponsiveTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch; /* Makes scrolling smooth on iPhones */
`;

const BaseTableStructure = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  @media (max-width: 768px) {
    min-width: 600px; /* Forces the table to stay wide enough to scroll nicely on mobile */
  }

  th {
    background: #f8fafc;
    border-bottom: 2px solid #e2e8f0;
    padding: 10px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    color: #64748b;
    letter-spacing: 0.03em;
  }

  tr {
    &:hover td { background: #f8fafc; }
  }

  td {
    padding: 10px;
    border-bottom: 1px solid #f1f5f9;
    font-size: 13px;
    color: #334155;
    white-space: nowrap;
  }

  .ref-cell {
    font-family: monospace;
    font-weight: 700;
    color: #0f172a;
  }

  .service-cell { font-weight: 600; }
  .amount-cell { font-weight: 700; color: #0f172a; }
  .date-cell { font-size: 12px; color: #64748b; }
`;

const ServiceInlineGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const StatusIndicatorBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;

  ${props => {
    switch (props.$status?.toLowerCase()) {
      case 'success':
      case 'completed':
        return `background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0;`;
      case 'failed':
      case 'cancelled':
        return `background: #fee2e2; color: #b91c1c; border: 1px solid #fca5a5;`;
      case 'in progress':
      case 'pending':
      default:
        return `background: #fef3c7; color: #b45309; border: 1px solid #fde68a;`;
    }
  }}
`;

const ScrollIndicatorBlock = styled.p`
  display: none; /* Hidden on desktop by default */
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: #94a3b8;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 8px 0;
  animation: pulseArrows 2s infinite ease-in-out;

  @media (max-width: 768px) {
    display: flex; /* Appears only on mobile tablets and phones */
  }

  .scroll-text {
    color: #64748b;
  }

  /* Optional: Adds a tiny visual bounce to catch their eye */
  @keyframes pulseArrows {
    0%, 100% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.03); opacity: 1; }
  }
`;