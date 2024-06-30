
import React, { useContext, useEffect, useState ,useRef} from "react";
import {FaRegArrowAltCircleDown,} from "react-icons/fa";
import { GiCash } from "react-icons/gi";
import { AppContext } from "../context/contexter";
import { MdOutlineDelete, MdOutlineRestaurant } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import Chart from "chart.js/auto"; 


const Home = () => {
  const { array, setarray, finalincome, finalexpense,finalbalance, setfinalincome, setfinalbalance, setfinalexpense,originalarray,setoriginalarray,editid,seteditid} = useContext(AppContext);
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const [selecteddate, setselecteddate] = useState(null);
  const [searched, setSearched] = useState("");
  const [categoryData, setCategoryData] = useState({});
  const chartRef = useRef(null); 

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const ctx = chartContainer.current.getContext("2d");

    const categories = ["Food", "Utilities", "Entertainment", "Salary", "Monthly rent", "Loan", "Travel", "Others"];
    const categoryData = categories.map(category => {
      const totalAmount = array.reduce((acc, curr) => {
        return curr.cat === category ? acc + parseFloat(curr.amount) : acc;
      }, 0);
      return totalAmount;
    });

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: categories,
        datasets: [{
          label: "Amount",
          data: categoryData,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
          ],
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1000,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [array]);



const onDelete = (id) => {
  const newarray = array.filter((each) => each.id !== id);
  const deletedItem = array.find((each) => each.id === id);

  if (deletedItem.money === "income") {
    const newIncome = finalincome - parseFloat(deletedItem.amount);
    setfinalincome(newIncome);
    setfinalbalance(newIncome - finalexpense);
  } else {
    const newExpense = finalexpense - parseFloat(deletedItem.amount);
    setfinalexpense(newExpense);
    setfinalbalance(finalincome - newExpense);
  }

  setarray(newarray);
  setoriginalarray(newarray); 

  localStorage.setItem('array', JSON.stringify(newarray));
  localStorage.setItem('originalarray', JSON.stringify(newarray));
  localStorage.setItem('finalincome', JSON.stringify(finalincome - (deletedItem.money === "income" ? parseFloat(deletedItem.amount) : 0)));
  localStorage.setItem('finalexpense', JSON.stringify(finalexpense - (deletedItem.money === "expense" ? parseFloat(deletedItem.amount) : 0)));
  localStorage.setItem('finalbalance', JSON.stringify((finalincome - (deletedItem.money === "income" ? parseFloat(deletedItem.amount) : 0)) - (finalexpense - (deletedItem.money === "expense" ? parseFloat(deletedItem.amount) : 0))));
};

const handlebutton = () => {
  setarray(originalarray);
  setSearched("");
};

const handlesearch = (e) => {
  let value = e.target.value.toLowerCase().trim();
  if (value === "") {
    setarray(originalarray);
  } else {
    let newarray = originalarray.filter((each) =>
      each.cat.toLowerCase().startsWith(value)
    );
    setarray(newarray);
  }
  setSearched(value);
};

const onEdit = (e) => {
  let id = e.currentTarget.name;
  seteditid(id);
};

const handleDateChange = (date) => {
  setselecteddate(date);

  if (date) {
    let formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
    let newarray = originalarray.filter(
      (each) => each.date === formattedDate
    );
    setarray(newarray);
  } else {
    setarray(originalarray);
  }
};

useEffect(() => {
  const storedArray = JSON.parse(localStorage.getItem('array'));
  const storedOriginalArray = JSON.parse(localStorage.getItem('originalarray'));
  const storedFinalIncome = JSON.parse(localStorage.getItem('finalincome'));
  const storedFinalExpense = JSON.parse(localStorage.getItem('finalexpense'));
  const storedFinalBalance = JSON.parse(localStorage.getItem('finalbalance'));

  if (storedArray) setarray(storedArray);
  if (storedOriginalArray) setoriginalarray(storedOriginalArray);
  if (storedFinalIncome) setfinalincome(storedFinalIncome);
  if (storedFinalExpense) setfinalexpense(storedFinalExpense);
  if (storedFinalBalance) setfinalbalance(storedFinalBalance);
}, []);



  return (
    <div className="bg-blue-900 text-white py-10 ">
      <div className="font-bold text-3xl text-center mb-6">Overview</div>
      <div className="sm:flex justify-around">
        <section className="income flex gap-4 justify-center items-center bg-blue-200 my-2 mx-8 py-5 px-7 rounded-md sm:mx-2">
          <FaArrowTrendUp className="text-green-700" />
          <div>
            <div className="text-green-700 text-xl">Income</div>
            <div className="text-blue-950">{finalincome}</div>
          </div>
        </section>
        <section className="expense flex gap-4 justify-center items-center bg-blue-200 my-2 mx-8 py-5 px-7 rounded-md sm:mx-2">
          <FaArrowTrendDown className="text-red-600" />
          <div>
            <div className="text-red-600 text-xl">Expense</div>
            <div className="text-blue-950">{finalexpense}</div>
          </div>
        </section>
        <section className="balance flex gap-4 justify-center items-center bg-blue-200 my-2 mx-8 py-5 px-7 rounded-md sm:mx-2">
          <div className="text-blue-950"><GiCash /></div>
          <div>
            <div className="text-blue-500 text-xl">Balance</div>
            <div className="text-blue-950">{finalbalance}</div>
          </div>
        </section>
      </div>
      <div>
        <div className="mx-6 text-center text-2xl my-6">Recent Transactions</div>
        {/* Transaction List */}
        <div className="">
          {/* Search and Filter */}
          <div className="searchbar-date sm:flex sm:justify-around sm:items-end mb-5">
            <div className="search-clear flex justify-center">
              <input
                type="text"
                placeholder="Search by category"
                value={searched}
                onChange={(e) => {
                  handlesearch(e);
                  setSearched(e.target.value);
                }}
                className="search bg-blue-100 p-2 rounded-md text-black"
              />
              <button
                onClick={handlebutton}
                className="ml-2 bg-blue-950 text-white py-2 px-3 rounded-md"
              >
                Clear
              </button>
            </div>
            <div className="datepicker text-center mt-3 sm:text-left">
              <div className="m-1">Select date</div>
              <div>
                <DatePicker
                  selected={selecteddate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  className="text-black bg-blue-100 rounded px-1"
                />
              </div>
            </div>
          </div>
        </div>
  
        {array.length === 0 ? (
          <div className="text-center text-xl mt-12">No Transactions</div>
        ) : (
          array.map((eachitem) => (
            <div key={eachitem.id} className="mx-auto p-1">
              <div className="w-full mx-auto p-1 sm:p-3 justify-between items-center flex bg-blue-950 sm:w-2/3 rounded-md">
                {eachitem.money === "income" ? (
                  <div className="flex gap-2 sm:gap-3 justify-start items-center w-1/4">
                    <FaArrowTrendUp className="text-green-700" />
                    <div className="text-green-400">{eachitem.amount}</div>
                  </div>
                ) : (
                  <div className="flex gap-3 sm:gap-3 justify-start items-center w-1/4">
                    <FaArrowTrendDown className="text-red-600" />
                    <div className="text-red-500">{eachitem.amount}</div>
                  </div>
                )}
                <div className="w-1/3 text-center">{eachitem.cat}</div>
                <div className="w-1/4 text-center">{eachitem.date}</div>
                <div className="flex gap-1 sm:gap-10">
                  <Link
                    to="/AddRecord"
                    name={eachitem.id}
                    className=""
                    onClick={onEdit}
                  >
                    <CiEdit />
                  </Link>
                  <button className="" onClick={() => onDelete(eachitem.id)}>
                    <MdOutlineDelete />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mx-6 text-center text-2xl my-6">Category Overview</div>
      <div className="mx-10 flex justify-center">
        <canvas ref={chartContainer} id="myChart" className="h-28  w-auto sm:h-15 sm:w-5"></canvas>
      </div>
    </div>
  );
};

export default Home;


