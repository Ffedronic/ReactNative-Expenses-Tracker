import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { DUMMY_EXPENSES } from "../data/dummy-expenses";
import { ExpensesContext } from "../store/expense-context";
import { getDateMinusDays } from "../utils/function";

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();

    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo;
  });

  return (
    <ExpensesOutput periodName={"Last 7 days"} expenses={recentExpenses} />
  );
}

export default RecentExpenses;
