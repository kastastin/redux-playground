import formatCurrency from "../utils/formatCurrency";

export default function BalanceDisplay() {
  return <div className="balance">{formatCurrency(123456)}</div>;
}
