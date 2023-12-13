import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expense-context";
import { getDateMinusDays } from "../utils/function";
import { fetchExpenses } from "../utils/http";
import OverLay from "../components/UI/OverLay";

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    setIsFetching(true);
    async function getExpenses() {
      const expenses = await fetchExpenses();
      expensesCtx.setDBExpenses(expenses);
      setIsFetching(false);
    }

    getExpenses();
  }, []);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();

    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo;
  });

  if (isFetching) {
    return <OverLay />;
  }

  return (
    <ExpensesOutput periodName={"Last 7 days"} expenses={recentExpenses} />
  );
}

export default RecentExpenses;
