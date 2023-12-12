import { createContext, useState } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpenses: ({ description, amount, date }) => {},
  setDBExpenses: (expenses) => {},
  deleteExpenses: (id) => {},
  updateExpenses: (id, { description, amount, date }) => {},
});

function ExpenseContextProvider({ children }) {
  const [expenses, setExpenses] = useState([]);

  function addExpenses(expense) {
    setExpenses((currentExpenses) => [
      ...currentExpenses,
      { ...expense, id: `${Math.random() * (100000000000 - 1) + 1}` },
    ]);
  }

  function deleteExpenses(id) {
    setExpenses((expenses) => {
      return expenses.filter((expense) => expense.id !== id);
    });
  }

  function setDBExpenses(expenses) {
    setExpenses(expenses);
  }

  function updateExpenses(id, data) {
    let expensesToUpdate = [...expenses];
    const updatableExpenseIndex = expensesToUpdate.findIndex(
      (expense) => expense.id === id
    );
    const updatableExpense = expensesToUpdate[updatableExpenseIndex];
    const updatedItem = { ...updatableExpense, ...data };

    expensesToUpdate[updatableExpenseIndex] = updatedItem;
    setExpenses(expensesToUpdate);
  }

  const values = {
    expenses: expenses,
    addExpenses: addExpenses,
    setDBExpenses: setDBExpenses,
    deleteExpenses: deleteExpenses,
    updateExpenses: updateExpenses,
  };

  return (
    <ExpensesContext.Provider value={values}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpenseContextProvider;
