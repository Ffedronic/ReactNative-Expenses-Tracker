import { Text, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { DUMMY_EXPENSES } from "../data/dummy-expenses";

function RecentExpenses() {
  return (
   <ExpensesOutput periodName={"Last 7 days"} expenses={DUMMY_EXPENSES} />
  );
}

export default RecentExpenses;
