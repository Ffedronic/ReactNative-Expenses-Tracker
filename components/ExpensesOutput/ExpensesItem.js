import { Text, View, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";

function ExpensesItem({ itemData }) {

const navigation = useNavigation()

    function expensePressHandler() {
        navigation.navigate("ManageExpenses", {expenseId : itemData.item.id})
    }

  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {itemData.item.description}
          </Text>
          <Text style={styles.textBase}>
            {itemData.item.date.toISOString().slice(0, 10)}
          </Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>€{itemData.item.amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 6,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
    textAlign: "center",
  },
  pressed: { opacity: 0.75 },
});

export default ExpensesItem;
