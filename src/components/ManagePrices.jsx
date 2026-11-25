import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  FaTags, FaPlus, FaPenToSquare, FaTrashCan, 
  FaWallet, FaXmark, FaShieldHalved 
} from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { Context } from './Context';

const ManagePrices = () => {
  const { api_url, user, prices, fetchPrices } = useContext(Context);

  const [loading, setLoading] = useState(false);
  
  // Modal State Controls
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [priceVal, setPriceVal] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);


  const handleOpenCreateModal = () => {
    setEditingId(null);
    setPriceVal('');
    setDescription('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingId(item.id);
    setPriceVal(item.price);
    setDescription(item.description);
    setIsModalOpen(true);
  };

  const handleSavePrice = async (e) => {
    e.preventDefault();

    if (!priceVal || !description.trim()) {
      Swal.fire({ icon: 'error', title: 'Incomplete Fields', text: 'Please fill out all required fields.', confirmButtonColor: '#2563eb' });
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${api_url}/save_price.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingId,
          price: parseFloat(priceVal),
          description: description
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        Swal.fire({ icon: 'success', title: 'Success', text: data.message, confirmButtonColor: '#2563eb' });
        setIsModalOpen(false);
        fetchPrices();
      } else {
        Swal.fire({ icon: 'error', title: 'Operation Failed', text: data.error || 'Could not save price record.', confirmButtonColor: '#dc2626' });
      }
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Connection Error', text: 'Failed to execute database transaction.', confirmButtonColor: '#dc2626' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeletePrice = (id) => {
    Swal.fire({
      title: 'Delete Price Record?',
      text: 'This action is permanent and will remove the service price configuration.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Delete'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${api_url}/delete_price.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
          });
          const data = await response.json();
          if (response.ok && data.success) {
            Swal.fire({ icon: 'success', title: 'Deleted', text: data.message, confirmButtonColor: '#2563eb' });
            fetchPrices();
          } else {
            Swal.fire({ icon: 'error', title: 'Error', text: data.error || 'Could not delete item.', confirmButtonColor: '#dc2626' });
          }
        } catch (error) {
          Swal.fire({ icon: 'error', title: 'Connection Error', text: 'Server communication failed.', confirmButtonColor: '#dc2626' });
        }
      }
    });
  };

  return (
    <ViewShellFrame>
      {/* HEADER BAR */}
      <HeaderLabelBoundary>
        <IconBoxWrapper><FaTags size={14} /></IconBoxWrapper>
        <div>
          <ViewMainTitle>Price Management Console</ViewMainTitle>
          <ViewSubTitle>Perform complete CRUD operations for service rates</ViewSubTitle>
        </div>
        <HeaderActionButton onClick={handleOpenCreateModal}>
          <FaPlus size={11} /> <span>Add New Price</span>
        </HeaderActionButton>
      </HeaderLabelBoundary>

      <SplitLowerLayoutGrid>
        {/* PRICES LIST TABLE VIEW */}
        <ProcessingCoreCard>
          <TableWrapperContainer>
            <StyledDataTable>
              <thead>
                <tr>
                    <th>ID</th>
                  <th>Description</th>
                  <th>Price (₦)</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>Loading price records...</td>
                  </tr>
                ) : prices.length === 0 ? (
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>No price configurations found.</td>
                  </tr>
                ) : (
                  prices.map((item) => (
                    <tr key={item.id}>
                        <td><strong>{item.id}</strong></td>
                      <td><strong>{item.description}</strong></td>
                      <td>₦{item.price.toFixed(2)}</td>
                      <td>
                        <ActionButtonsGroup>
                          <EditActionBtn onClick={() => handleOpenEditModal(item)} title="Edit Price">
                            <FaPenToSquare size={12} />
                          </EditActionBtn>
                          {/* <DeleteActionBtn onClick={() => handleDeletePrice(item.id)} title="Delete Price">
                            <FaTrashCan size={12} />
                          </DeleteActionBtn> */}
                        </ActionButtonsGroup>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </StyledDataTable>
          </TableWrapperContainer>
        </ProcessingCoreCard>

        {/* RIGHT METADATA PANEL */}
        <RightContextMetaTilePanel>
          <WalletSummaryWidgetCard>
            <div className="label-cluster">
              <FaWallet size={12} />
              <span>Balance Available</span>
            </div>
            <h3>₦{user?.balance?.toLocaleString(undefined, {minimumFractionDigits: 2})}</h3>
          </WalletSummaryWidgetCard>

          <EmptyStateNoticeFramePlaceholder>
            <FaShieldHalved size={24} />
            <h4>Secure Rate Engine</h4>
            <p>Modify pricing records dynamically. Changes instantly reflect across user verification workflows and fee calculators.</p>
          </EmptyStateNoticeFramePlaceholder>
        </RightContextMetaTilePanel>
      </SplitLowerLayoutGrid>

      {/* CREATE / EDIT MODAL LAYER */}
      {isModalOpen && (
        <ModalOverlayBackdrop>
          <ModalContentWindowBox onSubmit={handleSavePrice}>
            <ModalHeaderRow>
              <h4>{editingId ? 'Edit Price Record' : 'Create New Price Record'}</h4>
              <ModalCloseButton type="button" onClick={() => setIsModalOpen(false)}>
                <FaXmark size={14} />
              </ModalCloseButton>
            </ModalHeaderRow>

            <InputGroupBlock>
              <FieldInputLabel>Description / Service Title</FieldInputLabel>
              <FormTextareaNode 
                rows="3" 
                placeholder="Enter description for this service rate"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </InputGroupBlock>

            <InputGroupBlock>
              <FieldInputLabel>Numeric Price (₦)</FieldInputLabel>
              <FieldInputNode 
                type="number" 
                step="0.01" 
                placeholder="0.00" 
                value={priceVal}
                onChange={(e) => setPriceVal(e.target.value)}
                required
              />
            </InputGroupBlock>

            <ExecutionTriggerBtn type="submit" disabled={submitting}>
              {submitting ? 'Saving Configuration...' : (editingId ? 'Update Price Record' : 'Save New Price')}
            </ExecutionTriggerBtn>
          </ModalContentWindowBox>
        </ModalOverlayBackdrop>
      )}
    </ViewShellFrame>
  );
};

export default ManagePrices;

/* -------------------------------------------------------------------------- */
/* STYLED COMPONENTS CSS ENGINE (STRICT 10PX CEILING GRID RULE ARCHITECTURE)  */
/* -------------------------------------------------------------------------- */

const ViewShellFrame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
`;

const HeaderLabelBoundary = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 10px;
`;

const IconBoxWrapper = styled.div`
  width: 32px;
  height: 32px;
  background: #eef2f6;
  border: 1px solid #cbd5e1;
  color: #0f172a;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ViewMainTitle = styled.h2`
  font-size: 15px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
`;

const ViewSubTitle = styled.p`
  font-size: 11px;
  color: #64748b;
  margin: 0;
`;

const HeaderActionButton = styled.button`
  margin-left: auto;
  background: #2563eb;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover { background: #1d4ed8; }
`;

const SplitLowerLayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1.1fr;
  gap: 10px;

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`;

const ProcessingCoreCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TableWrapperContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const StyledDataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  th {
    font-size: 10px;
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    padding: 8px 10px;
  }

  td {
    font-size: 12px;
    color: #1e293b;
    border-bottom: 1px solid #f1f5f9;
    padding: 10px;
  }

  tr:last-child td { border-bottom: none; }
`;

const ActionButtonsGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
`;

const EditActionBtn = styled.button`
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  color: #2563eb;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover { background: #dbeafe; }
`;

const DeleteActionBtn = styled.button`
  background: #ffeeec;
  border: 1px solid #fecaca;
  color: #dc2626;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover { background: #fee2e2; }
`;

const RightContextMetaTilePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const WalletSummaryWidgetCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 10px;

  .label-cluster {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 10px;
    color: #64748b;
    font-weight: 600;
  }

  h3 { font-size: 18px; font-weight: 800; color: #0f172a; margin: 4px 0 0 0; }
`;

const EmptyStateNoticeFramePlaceholder = styled.div`
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  border-radius: 10px;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex: 1;

  svg { color: #94a3b8; margin-bottom: 6px; }
  h4 { font-size: 12px; font-weight: 700; color: #475569; margin: 0; text-transform: uppercase; }
  p { font-size: 11px; line-height: 1.4; color: #64748b; margin: 4px 0 0 0; max-width: 250px; }
`;

const ModalOverlayBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 10px;
`;

const ModalContentWindowBox = styled.form`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 15px;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
`;

const ModalHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 8px;

  h4 {
    font-size: 13px;
    font-weight: 800;
    color: #0f172a;
    margin: 0;
    text-transform: uppercase;
  }
`;

const ModalCloseButton = styled.button`
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover { color: #0f172a; }
`;

const InputGroupBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const FieldInputLabel = styled.label`
  font-size: 11px;
  font-weight: 700;
  color: #1e293b;
`;

const FieldInputNode = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  outline: none;
  box-sizing: border-box;

  &:focus { border-color: #2563eb; }
`;

const FormTextareaNode = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  outline: none;
  box-sizing: border-box;
  resize: vertical;

  &:focus { border-color: #2563eb; }
`;

const ExecutionTriggerBtn = styled.button`
  width: 100%;
  background: #2563eb;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 10px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s ease;
  margin-top: 6px;

  &:hover { background: #1d4ed8; }
  &:disabled { background: #94a3b8; cursor: not-allowed; }
`;