import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTv, FaXmark } from 'react-icons/fa6';
import TvSubscription from './TvSubscription'; // Assuming the file name

const Grid = styled.div`
  display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px; padding: 10px;
`;

const Card = styled.button`
  padding: 20px; background: #fff; border: 1px solid #eee;
  border-radius: 12px; cursor: pointer; transition: 0.3s;
  &:hover { border-color: #6366f1; }
`;

const ModalOverlay = styled.div`
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5); display: flex; align-items: center;
  justify-content: center; z-index: 1000; padding: 10px;
`;

const TvServiceSelector = () => {
  const [activeService, setActiveService] = useState(null);

  const services = [
    { id: 'gotv', name: 'GOtv' },
    { id: 'dstv', name: 'DStv' },
    { id: 'startimes', name: 'StarTimes' },
    // { id: 'showmax', name: 'Showmax' }
  ];

  return (
    <div style={{ padding: '10px' }}>
      <h3 style={{ textAlign: 'center', margin: '10px', color:"#6366f1" }}>Select TV Provider</h3>
      <Grid>
        {services.map(s => (
          <Card key={s.id} onClick={() => setActiveService(s)}>
            <FaTv size={24} />
            <p>{s.name}</p>
          </Card>
        ))}
      </Grid>

      {activeService && (
        <ModalOverlay onClick={() => setActiveService(null)}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '500px' }}>
            <div style={{ textAlign: 'right', marginBottom: '10px' }}>
                <button onClick={() => setActiveService(null)} style={{border: 'none', background: 'none', cursor: 'pointer'}}>
                    <FaXmark size={24} />
                </button>
            </div>
            <TvSubscription serviceID={activeService.id} serviceName={activeService.name} />
          </div>
        </ModalOverlay>
      )}
    </div>
  );
};

export default TvServiceSelector;