// import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
// import { Context} from './Context';

// export const VasBillsContext = createContext(null);

// const EMPTY_GROUPS = {
//   AIRTIME: [],
//   DATA_BUNDLE: [],
//   ELECTRICITY: [],
//   CABLE_TV: [],
//   BETTING: [],
// };

// export function VasBillsProvider({ children }) {
//   const {api_url, user} = useContext(Context);
// const apiUrl = api_url


//   const [groupedBillers, setGroupedBillers] = useState(EMPTY_GROUPS);
//   const [loadingBillers, setLoadingBillers] = useState(false);
//   const [billersError, setBillersError] = useState(null);

//   const [itemsByBiller, setItemsByBiller] = useState({});
//   const [loadingBillerId, setLoadingBillerId] = useState(null);
//   const [validating, setValidating] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   const baseApi = apiUrl.replace(/\/+$/, '');

//   const fetchGroupedBillers = useCallback(async () => {
//     if (!baseApi) return;
//     setLoadingBillers(true);
//     setBillersError(null);

//     try {
//       const url = `${baseApi}/get_billers.php?_t=${Date.now()}`;
//       const res = await fetch(url, {
//         method: 'GET',
//         cache: 'no-store',
//         headers: {
//           'Cache-Control': 'no-cache, no-store, must-revalidate',
//           Pragma: 'no-cache',
//         },
//       });
//       const json = await res.json();

//       if (json.success && json.groups) {
//         setGroupedBillers({
//           AIRTIME: Array.isArray(json.groups.AIRTIME) ? json.groups.AIRTIME : [],
//           DATA_BUNDLE: Array.isArray(json.groups.DATA_BUNDLE) ? json.groups.DATA_BUNDLE : [],
//           ELECTRICITY: Array.isArray(json.groups.ELECTRICITY) ? json.groups.ELECTRICITY : [],
//           CABLE_TV: Array.isArray(json.groups.CABLE_TV) ? json.groups.CABLE_TV : [],
//           BETTING: Array.isArray(json.groups.BETTING) ? json.groups.BETTING : [],
//         });
//       } else {
//         setBillersError(json.error || 'Unable to load billers.');
//       }
//     } catch {
//       setBillersError('Network error while loading billers.');
//     } finally {
//       setLoadingBillers(false);
//     }
//   }, [baseApi]);

//   useEffect(() => {
//     fetchGroupedBillers();
//   }, [fetchGroupedBillers]);

//   const fetchPaymentItems = useCallback(
//     async (billerId) => {
//       if (!baseApi || !billerId) return [];
//       const key = String(billerId);
//       if (itemsByBiller[key]) {
//         return itemsByBiller[key];
//       }

//       setLoadingBillerId(key);
//       try {
//         const url = `${baseApi}/vas_bills.php?action=items&billerId=${encodeURIComponent(key)}&_t=${Date.now()}`;
//         const res = await fetch(url, {
//           method: 'GET',
//           cache: 'no-store',
//           headers: {
//             'Cache-Control': 'no-cache, no-store, must-revalidate',
//             Pragma: 'no-cache',
//           },
//         });
//         const json = await res.json();
//         const items = json.success && Array.isArray(json.data) ? json.data : [];
//         setItemsByBiller((prev) => ({ ...prev, [key]: items }));
//         return items;
//       } catch {
//         return [];
//       } finally {
//         setLoadingBillerId(null);
//       }
//     },
//     [baseApi, itemsByBiller]
//   );

//   const validateCustomer = useCallback(
//     async ({ paymentCode, customerId }) => {
//       if (!baseApi) {
//         return { success: false, error: 'API URL is not configured.' };
//       }
//       setValidating(true);
//       try {
//         const res = await fetch(`${baseApi}/vas_bills.php?action=validate&_t=${Date.now()}`, {
//           method: 'POST',
//           cache: 'no-store',
//           headers: {
//             'Content-Type': 'application/json',
//             'Cache-Control': 'no-cache, no-store, must-revalidate',
//             Pragma: 'no-cache',
//           },
//           body: JSON.stringify({
//             paymentCode,
//             customerId: String(customerId).trim(),
//           }),
//         });
//         return await res.json();
//       } catch {
//         return { success: false, error: 'Validation request failed. Please try again.' };
//       } finally {
//         setValidating(false);
//       }
//     },
//     [baseApi]
//   );

//   const payBill = useCallback(
//     async (payload) => {
//       if (!baseApi) {
//         return { success: false, error: 'API URL is not configured.' };
//       }
//       setSubmitting(true);
//       try {
//         const res = await fetch(`${baseApi}/interswitch/vas_bills.php?action=pay&_t=${Date.now()}`, {
//           method: 'POST',
//           cache: 'no-store',
//           headers: {
//             'Content-Type': 'application/json',
//             'Cache-Control': 'no-cache, no-store, must-revalidate',
//             Pragma: 'no-cache',
//           },
//           body: JSON.stringify(payload),
//         });
//         return await res.json();
//       } catch {
//         return { success: false, error: 'Network error while processing payment.' };
//       } finally {
//         setSubmitting(false);
//       }
//     },
//     [baseApi]
//   );

//   return (
//     <VasBillsContext.Provider
//       value={{
//         user,
//         apiUrl: baseApi,
//         groupedBillers,
//         loadingBillers,
//         billersError,
//         refreshBillers: fetchGroupedBillers,
//         itemsByBiller,
//         loadingBillerId,
//         fetchPaymentItems,
//         validateCustomer,
//         validating,
//         payBill,
//         submitting,
//       }}
//     >
//       {children}
//     </VasBillsContext.Provider>
//   );
// }




import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { Context } from './Context';

export const VasBillsContext = createContext(null);

const EMPTY_GROUPS = {
  AIRTIME: [],
  DATA_BUNDLE: [],
  ELECTRICITY: [],
  CABLE_TV: [],
  BETTING: [],
};

export function VasBillsProvider({ children }) {
  const appContext = useContext(Context) || {};
  const api_url = appContext.api_url ?? '';
  const user = appContext.user ?? null;
  const apiUrl = typeof api_url === 'string' ? api_url : '';

  // console.log(api_url)

  const [groupedBillers, setGroupedBillers] = useState(EMPTY_GROUPS);
  const [loadingBillers, setLoadingBillers] = useState(false);
  const [billersError, setBillersError] = useState(null);

  const [itemsByBiller, setItemsByBiller] = useState({});
  const [loadingBillerId, setLoadingBillerId] = useState(null);
  const [validating, setValidating] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const baseApi = apiUrl.replace(/\/+$/, '');

  const fetchGroupedBillers = useCallback(async () => {
    if (!baseApi) return;
    setLoadingBillers(true);
    setBillersError(null);

    try {
      const url = `${baseApi}/interswitch/get_billers.php?_t=${Date.now()}`;
      const res = await fetch(url, {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
        },
      });
      const json = await res.json();
// console.log(json)
      if (json.success && json.groups) {
        setGroupedBillers({
          AIRTIME: Array.isArray(json.groups.AIRTIME) ? json.groups.AIRTIME : [],
          DATA_BUNDLE: Array.isArray(json.groups.DATA_BUNDLE) ? json.groups.DATA_BUNDLE : [],
          ELECTRICITY: Array.isArray(json.groups.ELECTRICITY) ? json.groups.ELECTRICITY : [],
          CABLE_TV: Array.isArray(json.groups.CABLE_TV) ? json.groups.CABLE_TV : [],
          BETTING: Array.isArray(json.groups.BETTING) ? json.groups.BETTING : [],
        });
      } else {
        setBillersError(json.error || 'Unable to load billers.');
      }
    } catch {
      setBillersError('Network error while loading billers.');
    } finally {
      setLoadingBillers(false);
    }
  }, [baseApi]);

  useEffect(() => {
    fetchGroupedBillers();
  }, [fetchGroupedBillers]);

  const fetchPaymentItems = useCallback(
    async (billerId) => {
      if (!baseApi || !billerId) return [];
      const key = String(billerId);
      if (itemsByBiller[key]) {
        return itemsByBiller[key];
      }

      setLoadingBillerId(key);
      try {
        const url = `${baseApi}/interswitch/vas_bills.php?action=items&billerId=${encodeURIComponent(key)}&_t=${Date.now()}`;
        const res = await fetch(url, {
          method: 'GET',
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
          },
        });
        const json = await res.json();
        // console.log(json)
        const items = json.success && Array.isArray(json.data) ? json.data : [];
        setItemsByBiller((prev) => ({ ...prev, [key]: items }));
        return items;
      } catch {
        return [];
      } finally {
        setLoadingBillerId(null);
      }
    },
    [baseApi, itemsByBiller]
  );

  const validateCustomer = useCallback(
    async ({ paymentCode, customerId }) => {
      if (!baseApi) {
        return { success: false, error: 'API URL is not configured.' };
      }
      setValidating(true);
      try {
        const res = await fetch(`${baseApi}/interswitch/vas_bills.php?action=validate&_t=${Date.now()}`, {
          method: 'POST',
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
          },
          body: JSON.stringify({
            paymentCode,
            customerId: String(customerId).trim(),
          }),
        });
        return await res.json();
      } catch {
        return { success: false, error: 'Validation request failed. Please try again.' };
      } finally {
        setValidating(false);
      }
    },
    [baseApi]
  );

  const payBill = useCallback(
    async (payload) => {
      if (!baseApi) {
        return { success: false, error: 'API URL is not configured.' };
      }
      setSubmitting(true);
      try {
        const res = await fetch(`${baseApi}/interswitch/vas_bills.php?action=pay&_t=${Date.now()}`, {
          method: 'POST',
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
          },
          body: JSON.stringify(payload),
        });
        return await res.json();
      } catch {
        return { success: false, error: 'Network error while processing payment.' };
      } finally {
        setSubmitting(false);
      }
    },
    [baseApi]
  );

  return (
    <VasBillsContext.Provider
      value={{
        user,
        apiUrl: baseApi,
        groupedBillers,
        loadingBillers,
        billersError,
        refreshBillers: fetchGroupedBillers,
        itemsByBiller,
        loadingBillerId,
        fetchPaymentItems,
        validateCustomer,
        validating,
        payBill,
        submitting,
      }}
    >
      {children}
    </VasBillsContext.Provider>
  );
}