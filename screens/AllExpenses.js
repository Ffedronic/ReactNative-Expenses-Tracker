
import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expense-context";
import { DUMMY_EXPENSES } from "../data/dummy-expenses";

function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext)

  return (
    <ExpensesOutput periodName={"All Expenses"} expenses={expensesCtx.expenses} />
  );
}

export default AllExpenses;
