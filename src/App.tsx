import { useAppSelector } from "./hooks/useAppHooks";

import Customer from "./features/customers/Customer";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
import CreateCustomer from "./features/customers/CreateCustomer";
import AccountOperations from "./features/accounts/AccountOperations";

export default function App() {
  const fullName = useAppSelector((state) => state.customers.fullName);

  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {!fullName.length ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
    </div>
  );
}
