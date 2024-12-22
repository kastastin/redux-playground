import { useAppSelector } from "../../hooks/useAppHooks";
import formatCurrency from "../../utils/formatCurrency";

export default function BalanceDisplay() {
  const balance = useAppSelector((state) => state.accounts.balance);

  return <div className="balance">{formatCurrency(balance)}</div>;
}
