import React from "react";
import { FlatList, Text, View } from "react-native";
import ExpensesItem from "./ExpensesItem";

function renderExpensesItemHandler(itemData) {
  return <ExpensesItem itemData={itemData} />;
}

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(expense) => expense.id}
      renderItem={renderExpensesItemHandler}
    />
  );
}

export default ExpensesList;
