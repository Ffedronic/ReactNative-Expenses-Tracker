import { createContext, useState } from "react";

export const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A phone",
    amount: 94.99,
    date: new Date("2022-01-05"),
  },
  {
    id: "e2",
    description: "A mobile phone",
    amount: 94.99,
    date: new Date("2022-01-05"),
  },
  {
    id: "e3",
    description: "A pull",
    amount: 39.99,
    date: new Date("2021-12-01"),
  },
  {
    id: "e4",
    description: "A belt",
    amount: 49.99,
    date: new Date("2022-02-19"),
  },
  {
    id: "e5",
    description: "A book",
    amount: 29.99,
    date: new Date("2023-11-30"),
  },
  {
    id: "e6",
    description: "A new book",
    amount: 29.99,
    date: new Date("2023-12-04"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpenses: ({ description, amount, date }) => {},
  deleteExpenses: (id) => {},
  updateExpenses: (id, { description, amount, date }) => {},
});

function ExpenseContextProvider({ children }) {
  const [expenses, setExpenses] = useState([...DUMMY_EXPENSES]);

  function addExpenses(expense) {
    setExpenses((currentExpenses) => [
      ...currentExpenses,
      { ...expense, id: `${Math.random() * (100000000000 - 1) + 1}` }
    ]);
  }

  function deleteExpenses(id) {
    setExpenses((expenses) => {
      return expenses.filter((expense) => expense.id !== id);
    });
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
