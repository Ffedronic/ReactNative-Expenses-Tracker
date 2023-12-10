import { StyleSheet, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

function ExpensesOutput({ expenses, periodName }) {
  return (
    <View style={styles.container}>
       <ExpensesSummary periodName={periodName} expenses={expenses} />
      <ExpensesList expenses={expenses} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1
  }
})
export default ExpensesOutput;
