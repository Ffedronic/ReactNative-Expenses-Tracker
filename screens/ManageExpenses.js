import { useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import CustsomButton from "../components/UI/CustsomButton";
import { ExpensesContext } from "../store/expense-context";
import ExpenseForm from "../components/ManageExpenses/ExpenseForm";

function ManageExpenses({ route, navigation }) {
  const expenseCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  const editingMode = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: editingMode ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, editingMode]);

  function deleteExpenseHandler() {
    expenseCtx.deleteExpenses(editedExpenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler({ description, amount, date }) {
    if (editingMode) {
      expenseCtx.updateExpenses(editedExpenseId, {
        description: description,
        amount: +amount,
        date: new Date(date),
      });
    } else {
      expenseCtx.addExpenses({
        description: description,
        amount: +amount,
        date: new Date(date),
      });
    }

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        editingMode={editingMode}
        onConfirm={confirmHandler}
        selectedExpense={selectedExpense}
      />
      {editingMode && (
        <View style={styles.deleteContainer}>
          <IconButton
            name="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
export default ManageExpenses;
