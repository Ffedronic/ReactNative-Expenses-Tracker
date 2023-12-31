import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expense-context";
import ExpenseForm from "../components/ManageExpenses/ExpenseForm";
import { deleteDBExpense, storeExpense, updateDBExpense } from "../utils/http";
import OverLay from "../components/UI/OverLay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpenses({ route, navigation }) {
  const expenseCtx = useContext(ExpensesContext);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

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

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      await deleteDBExpense(editedExpenseId);
      expenseCtx.deleteExpenses(editedExpenseId);
      setIsSubmitting(false);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete the expenses!");
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler({ description, amount, date }) {
    const expenseData = {
      description: description.value,
      amount: +amount.value,
      date: new Date(date.value),
    };

    setIsSubmitting(true);

    if (editingMode) {
      try {
        await updateDBExpense(editedExpenseId, expenseData);
        expenseCtx.updateExpenses(editedExpenseId, expenseData);
        setIsSubmitting(false);
        navigation.goBack();
      } catch (error) {
        setError("Could not update the expense!");
      }
    } else {
      try {
        const id = await storeExpense(expenseData);
        expenseCtx.addExpenses(id, expenseData);
        setIsSubmitting(false);
        navigation.goBack();
      } catch (error) {
        setError("Could not store the expense!");
      }
    }
  }

  function errorHandler() {
    setError(null);
    setIsSubmitting(false);
  }

  if (error && isSubmitting) {
    return <ErrorOverlay message={error} onError={errorHandler} />;
  }

  if (isSubmitting) {
    return <OverLay />;
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
