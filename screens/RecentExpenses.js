import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expense-context";
import { getDateMinusDays } from "../utils/function";
import { fetchExpenses } from "../utils/http";
import OverLay from "../components/UI/OverLay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsFetching(true);
    async function getExpenses() {
      try {
        const expenses = await fetchExpenses();

        expensesCtx.setDBExpenses(expenses);

        setIsFetching(false);
      } catch (error) {
        setError("Could not fetch the expenses!");
      }
    }

    getExpenses();
  }, []);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();

    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo;
  });

  function errorHandler() {
    setError(null);
    setIsFetching(false);
  }

  if (error && isFetching) {
    return <ErrorOverlay message={error} onError={errorHandler} />;
  }

  if (isFetching) {
    return <OverLay />;
  }

  return (
    <ExpensesOutput periodName={"Last 7 days"} expenses={recentExpenses} />
  );
}

export default RecentExpenses;
