import React, { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AppContext } from "../context/contexter";

const AddRecord = () => {
  const {updatearray,finalincome,setfinalincome,finalexpense,setfinalexpense,setmoney,money,finalbalance,setfinalbalance,originalarray,setoriginalarray,setarray,array,value,setvalue,editid,seteditid,
  } = useContext(AppContext);

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const storedArray = JSON.parse(localStorage.getItem("array"));
    const storedOriginalArray = JSON.parse(localStorage.getItem("originalarray"));
    const storedFinalIncome = JSON.parse(localStorage.getItem("finalincome"));
    const storedFinalExpense = JSON.parse(localStorage.getItem("finalexpense"));
    const storedFinalBalance = JSON.parse(localStorage.getItem("finalbalance"));

    if (storedArray) setarray(storedArray);
    if (storedOriginalArray) setoriginalarray(storedOriginalArray);
    if (storedFinalIncome) setfinalincome(storedFinalIncome);
    if (storedFinalExpense) setfinalexpense(storedFinalExpense);
    if (storedFinalBalance) setfinalbalance(storedFinalBalance);
  }, []);

  const handleDateChange = (newvalue) => {
    setvalue(newvalue);
  };

  const handleAdd = (e) => {
    e.preventDefault();

    const newItem = {
      amount: parseFloat(amount),
      desc: description,
      cat: category,
      id: editid || uuidv4(),
      money: money,
      date: value.toLocaleDateString(),
    };

    if (editid) {
      const editedItem = originalarray.find((item) => item.id === editid);
      const updatedArray = originalarray.map((item) =>
        item.id === editid ? newItem : item
      );

      const amountDifference = parseFloat(newItem.amount) - parseFloat(editedItem.amount);

      if (editedItem.money === "income" && newItem.money === "expense") {
        setfinalincome((prev) => prev - parseFloat(editedItem.amount));
        setfinalexpense((prev) => prev + parseFloat(newItem.amount));
        setfinalbalance((prev) => prev - parseFloat(editedItem.amount) - parseFloat(newItem.amount));
      } 
      else if (editedItem.money === "expense" && newItem.money === "income") {
        
        setfinalexpense((prev) => prev - parseFloat(editedItem.amount));
        setfinalincome((prev) => prev + parseFloat(newItem.amount));
        setfinalbalance((prev) => prev + parseFloat(editedItem.amount) + parseFloat(newItem.amount));
      } 
      else if (newItem.money === "income") {
        
        setfinalincome((prev) => prev + amountDifference);
        setfinalbalance((prev) => prev + amountDifference);
      } 
      else if (newItem.money === "expense") {
      
        setfinalexpense((prev) => prev + amountDifference);
        setfinalbalance((prev) => prev - amountDifference);
      }

      setoriginalarray(updatedArray);
      setarray(updatedArray);
      seteditid(""); 

     
      localStorage.setItem("array", JSON.stringify(updatedArray));
      localStorage.setItem("originalarray", JSON.stringify(updatedArray));
      localStorage.setItem("finalincome", JSON.stringify(finalincome));
      localStorage.setItem("finalexpense", JSON.stringify(finalexpense));
      localStorage.setItem("finalbalance", JSON.stringify(finalbalance));
    } 
    else {
      
      const updatedArray = [...array, newItem];
      updatearray(newItem);

      if (money === "income") {
        setfinalincome((prev) => prev + parseFloat(amount));
        setfinalbalance((prev) => prev + parseFloat(amount));
      } else {
        setfinalexpense((prev) => prev + parseFloat(amount));
        setfinalbalance((prev) => prev - parseFloat(amount));
      }

      setoriginalarray(updatedArray);
      setarray(updatedArray);

     
      localStorage.setItem("array", JSON.stringify(updatedArray));
      localStorage.setItem("originalarray", JSON.stringify(updatedArray));
      localStorage.setItem("finalincome", JSON.stringify(finalincome));
      localStorage.setItem("finalexpense", JSON.stringify(finalexpense));
      localStorage.setItem("finalbalance", JSON.stringify(finalbalance));
    }

    
    setAmount("");
    setCategory("");
    setDescription("");
    setvalue(new Date());
  };

  useEffect(() => {
    localStorage.setItem("array", JSON.stringify(array));
    localStorage.setItem("originalarray", JSON.stringify(originalarray));
    localStorage.setItem("finalincome", JSON.stringify(finalincome));
    localStorage.setItem("finalexpense", JSON.stringify(finalexpense));
    localStorage.setItem("finalbalance", JSON.stringify(finalbalance));
  }, [array, originalarray, finalincome, finalexpense, finalbalance]);

  return (
    <div className="Record text-center my-1 mx-10">
      <form className="border-black border-2 px-5">
        <div className="flex gap-4 justify-center items-center">
          <div className="flex gap-1 items-center justify-center">
            <label htmlFor="income"> Income</label>
            <input
              type="radio"
              id="income"
              name="money"
              value="income"
              onChange={(e) => setmoney("income")}
              className="mt-1"
            ></input>
          </div>
          <div className="flex gap-1 items-center justify-center">
            <label htmlFor="expense"> Expense</label>
            <input
              type="radio"
              id="expense"
              name="money"
              value="expense"
              onChange={(e) => setmoney("expense")}
              className="mt-1"
            ></input>
          </div>
        </div>
        <div className="flex items-center p-2 sm:p-1 flex-col gap-1 justify-center text-left">
          <label htmlFor="amount">Amount</label>
          <input
            type="text"
            id="amount"
            name="Amount"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className=" bg-slate-300 w-3/4 p-2"
          />
        </div>
        <div className="flex items-center p-2 sm:p-3 flex-col gap-1 justify-center text-black text-left">
          <select
            name="category"
            required
            onChange={(e) => setCategory(e.target.value)}
            className="text-black border-black border-2 "
          >
            <option value="Food">Food</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Salary">Salary</option>
            <option value="Monthly rent">Monthly rent</option>
            <option value="Loan">Loan</option>
            <option value="Travel">Travel</option>
            <option value="Others">Others</option>

          </select>
        </div>
        <div className="calendar mx-auto flex justify-center">
          <Calendar onChange={handleDateChange} value={value} />
        </div>

        <div className="flex items-center p-2 sm:p-3 flex-col gap-1 justify-center text-left">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="Description"
            placeholder="Enter Description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className=" bg-slate-300 w-3/4 p-2"
          />
        </div>
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white w-36 mx-auto p-2 mt-2 mb-2 rounded-md"
        >
          <a href="/">Add</a>
        </button>
      </form>
    </div>
  );
};

export default AddRecord;
