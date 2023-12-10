import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import CustsomButton from "../UI/CustsomButton";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({ onCancel, editingMode, onConfirm, selectedExpense }) {
  const [inputValues, setInputValues] = useState({
    amount: {
      value: selectedExpense ? selectedExpense.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: selectedExpense
        ? selectedExpense.date.toISOString().slice(0, 10)
        : "",
      isValid: true,
    },
    description: {
      value: selectedExpense ? selectedExpense.description : "",
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifer, enteredValue) {
    setInputValues((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifer]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const amountIsValid =
      inputValues.amount.value > 0 && !isNaN(inputValues.amount.value);
    const dateIsValid =
      new Date(inputValues.date.value).toString() !== "Invalid Date";
    const descriptionIsValid = inputValues.description.value.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert("wrong values!")
      setInputValues((currentInputs) => {
        return {
          amount: { value: currentInputs.amount.value, isValid: amountIsValid },
          description: {
            value: currentInputs.description.value,
            isValid: descriptionIsValid,
          },
          date: { value: currentInputs.date.value, isValid: dateIsValid },
        };
      });
      return;
    }

    onConfirm(inputValues);
  }

  const formIsValid =
    !inputValues.amount.isValid ||
    !inputValues.date.isValid ||
    !inputValues.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
        invalid={!inputValues.amount.isValid}
          style={styles.rowInput}
          label={"amount"}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputValues.amount.value,
          }}
        />
        <Input
        invalid={!inputValues.date.isValid}
          style={styles.rowInput}
          label={"date"}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputValues.date.value,
          }}
        />
      </View>
      <Input
      invalid={!inputValues.description.isValid}
        label={"description"}
        textInputConfig={{
          multiline: true,
          autoCorrect: false,
          autoCapitalize: "none",
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputValues.description.value,
        }}
      />
      {formIsValid && (
        <Text style={styles.invalidText}>
          Invalid input values. Please check your entered data !
        </Text>
      )}
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
  invalidText: {
    textAlign:"center",
    fontSize: 16,
    color: GlobalStyles.colors.error50,
    margin: 8,
  },
});
export default ExpenseForm;
