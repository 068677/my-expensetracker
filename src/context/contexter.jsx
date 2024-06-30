
import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [array, setarray] = useState(() => {
    const localData = localStorage.getItem('array');
    return localData ? JSON.parse(localData) : [];
  });
  const [finalincome, setfinalincome] = useState(() => {
    const localData = localStorage.getItem('finalincome');
    return localData ? JSON.parse(localData) : 0;
  });
  const [finalexpense, setfinalexpense] = useState(() => {
    const localData = localStorage.getItem('finalexpense');
    return localData ? JSON.parse(localData) : 0;
  });
  const [finalbalance, setfinalbalance] = useState(() => {
    const localData = localStorage.getItem('finalbalance');
    return localData ? JSON.parse(localData) : 0;
  });
  const [money, setmoney] = useState('');
  const [value, setvalue] = useState(new Date());
  const [editid, seteditid] = useState('');
  const [originalarray, setoriginalarray] = useState(() => {
    const localData = localStorage.getItem('originalarray');
    return localData ? JSON.parse(localData) : [];
  });

  const updatearray = (newItem) => {
    setarray((prevArray) => [...prevArray, newItem]);
    setoriginalarray((prevArray) => [...prevArray, newItem]);
  };

  // Add this useEffect to save state changes to local storage
  useEffect(() => {
    localStorage.setItem('array', JSON.stringify(array));
    localStorage.setItem('originalarray', JSON.stringify(originalarray));
    localStorage.setItem('finalincome', JSON.stringify(finalincome));
    localStorage.setItem('finalexpense', JSON.stringify(finalexpense));
    localStorage.setItem('finalbalance', JSON.stringify(finalbalance));
  }, [array, originalarray, finalincome, finalexpense, finalbalance]);

  return (
    <AppContext.Provider
      value={{
        array,
        setarray,
        finalincome,
        setfinalincome,
        finalexpense,
        setfinalexpense,
        finalbalance,
        setfinalbalance,
        money,
        setmoney,
        value,
        setvalue,
        editid,
        seteditid,
        originalarray,
        setoriginalarray,
        updatearray,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
