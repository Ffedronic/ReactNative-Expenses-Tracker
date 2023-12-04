import { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import CustsomButton from "../components/UI/CustsomButton";

function ManageExpenses({ route, navigation }) {
  const editedExpenseId = route.params?.expenseId;
  const editingMode = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: editingMode ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, editingMode]);

  function deleteExpenseHandler() {
    navigation.goBack()
  }

  function cancelHandler() {
    navigation.goBack()
  }

  function confirmHandler() {
    navigation.goBack()
  }
  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <CustsomButton mode="flat" onPress={cancelHandler} style={styles.button}>
          Cancel
        </CustsomButton>
        <CustsomButton onPress={confirmHandler} style={styles.button}>
          {editingMode ? "Update" : "Add"}
        </CustsomButton>
      </View>
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
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    minWidth: 120,
     marginHorizontal: 8
  }
});
export default ManageExpenses;