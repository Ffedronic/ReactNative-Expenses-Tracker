import React, { useContext, useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View, Alert } from "react-native";
import Input from "./Input";
import CustsomButton from "../UI/CustsomButton";
import { ExpensesContext } from "../../store/expense-context";

function ExpenseForm({ onCancel, editingMode, onConfirm, selectedExpense }) {
 

  const [inputValues, setInputValues] = useState({
    amount: selectedExpense ? selectedExpense.amount.toString() : "",
    date: selectedExpense
      ? selectedExpense.date.toISOString().slice(0, 10)
      : "",
    description: selectedExpense ? selectedExpense.description : "",
  });

  function inputChangedHandler(inputIdentifer, enteredValue) {
    setInputValues((currentInputValues) => {
      return { ...currentInputValues, [inputIdentifer]: enteredValue };
    });
  }

  function submitHandler() {
    const amountIsValid = inputValues.amount > 0 && !isNaN(inputValues.amount);
    const dateIsValid =
      new Date(inputValues.date).toString() !== "Invalid Date";
    const descriptionIsValid = inputValues.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      Alert.alert("alert", "please verify your values !");
      return;
    }

    onConfirm(inputValues);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label={"amount"}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputValues.amount,
          }}
        />
        <Input
          style={styles.rowInput}
          label={"date"}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputValues.date,
          }}
        />
      </View>
      <Input
        label={"description"}
        textInputConfig={{
          multiline: true,
          autoCorrect: false,
          autoCapitalize: "none",
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputValues.description,
        }}
      />
      <View style={styles.buttonsContainer}>
        <CustsomButton mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </CustsomButton>
        <CustsomButton onPress={submitHandler} style={styles.button}>
          {editingMode ? "Update" : "Add"}
        </CustsomButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
export default ExpenseForm;
