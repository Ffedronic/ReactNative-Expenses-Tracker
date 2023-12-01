import { View, Text } from "react-native";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { DUMMY_EXPENSES } from "../data/dummy-expenses";

function AllExpenses() {
  return (
    <ExpensesOutput periodName={"All Expenses"} expenses={DUMMY_EXPENSES} />
  );
}

export default AllExpenses;
