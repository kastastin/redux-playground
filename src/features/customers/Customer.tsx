import { useAppSelector } from "../../hooks/useAppHooks";

export default function Customer() {
  const fullName = useAppSelector((store) => store.customers.fullName);

  return <h2>👋 Welcome, {fullName}</h2>;
}
