import React from "react";
import { Text, TextInput, View } from "react-native";
import Input from "./Input";

function ExpenseForm() {
  function amountChangeHandler() {}
  return (
    <View>
      <Input
        label={"amount"}
        textInputConfig={{
          keyboardType: "decimal-pad",
          onChangeText: amountChangeHandler,
        }}
      />
      <Input
        label={"date"}
        textInputConfig={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: () => {},
        }}
      />
      <Input
        label={"description"}
        textInputConfig={{
          multiline: true,
          autoCorrect:false,
          autoCapitalize:"none",
          onChangeText: () => {},
        }}
      />
    </View>
  );
}

export default ExpenseForm;
