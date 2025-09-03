import React, { useState } from "react";
import { Text, View, Button, TextInput } from "react-native";

export default function TradingSim() {
  const [balance, setBalance] = useState(10000);
  const [stockPrice, setStockPrice] = useState(100);
  const [shares, setShares] = useState(0);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  // Simulate price change
  const nextPrice = () => {
    const change = (Math.random() - 0.5) * 10;
    setStockPrice((p) => Math.max(1, Math.round((p + change) * 100) / 100));
  };

  // Buy shares
  const buy = () => {
    const qty = parseInt(input);
    if (isNaN(qty) || qty <= 0) return setMessage("Enter a valid quantity.");
    const cost = qty * stockPrice;
    if (cost > balance) return setMessage("Not enough balance.");
    setBalance((b) => b - cost);
    setShares((s) => s + qty);
    setMessage(`Bought ${qty} shares.`);
    setInput("");
    nextPrice();
  };

  // Sell shares
  const sell = () => {
    const qty = parseInt(input);
    if (isNaN(qty) || qty <= 0) return setMessage("Enter a valid quantity.");
    if (qty > shares) return setMessage("Not enough shares.");
    setBalance((b) => b + qty * stockPrice);
    setShares((s) => s - qty);
    setMessage(`Sold ${qty} shares.`);
    setInput("");
    nextPrice();
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-50 px-4">
      <Text className="text-2xl font-bold text-blue-600 mb-2">Stock Market Simulator</Text>
      <Text className="text-lg mb-1">Balance: ${balance.toFixed(2)}</Text>
      <Text className="text-lg mb-1">Stock Price: ${stockPrice.toFixed(2)}</Text>
      <Text className="text-lg mb-1">Your Shares: {shares}</Text>
      <TextInput
        className="border border-gray-300 rounded px-2 py-1 w-32 my-2 bg-white"
        keyboardType="numeric"
        placeholder="Quantity"
        value={input}
        onChangeText={setInput}
      />
      <View className="flex-row mb-2">
        <View className="mr-2">
          <Button title="Buy" onPress={buy} />
        </View>
        <Button title="Sell" onPress={sell} />
      </View>
      <Text className="text-red-500 mt-2">{message}</Text>
    </View>
  );
}