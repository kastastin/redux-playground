import Customer from "./components/Customer";
import BalanceDisplay from "./components/BalanceDisplay";
import CreateCustomer from "./components/CreateCustomer";
import AccountOperations from "./components/AccountOperations";

export default function App() {
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      <CreateCustomer />
      <Customer />
      <AccountOperations />
      <BalanceDisplay />
    </div>
  );
}
