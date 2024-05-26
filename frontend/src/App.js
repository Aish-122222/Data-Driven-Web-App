import './App.css';
import FileUpload from './components/FileUpload';
import DataDisplay from './components/DataDisplay';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from './constants/common';
import SubscriptionPriceInput from './components/SubscriptionPriceInput';

const AppContext = createContext({});

export const useAppContext = () => {
  return useContext(AppContext);
};

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); 
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [basePrice, setBasePrice] = useState(10);
  const [pricePerCreditLine, setPricePerCreditLine] = useState(1);
  const [pricePerCreditScorePoint, setPricePerCreditScorePoint] = useState(1);

  const fetchData = useCallback(async (limit, page) => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/data?page=${page}&limit=${limit}`);
      setData(response.data.data);
      setTotalRows(response.data.totalRows);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);

      setLoading(false);
      setData([]);
      setTotalRows(0);
    }
  }, []);

  const calculateSubscriptionPrice = useCallback((creditLines, creditScore) => {
    return basePrice + (pricePerCreditLine * creditLines) + (pricePerCreditScorePoint * creditScore);
  }, [basePrice, pricePerCreditLine, pricePerCreditScorePoint]);

  useEffect(() => {
    fetchData(limit, page);
  }, []);

  return (
    <AppContext.Provider value={{
      data,
      page,
      limit,
      totalRows,
      setTotalRows,
      setData,
      setPage,
      setLimit,
      fetchData,
      loading,
      calculateSubscriptionPrice,
      basePrice,
      setBasePrice,
      pricePerCreditLine,
      setPricePerCreditLine,
      pricePerCreditScorePoint,
      setPricePerCreditScorePoint
    }}>
      <div className='p-4'>
        <h2 className='text-xl text-center font-bold mb-4'>Hackathon Task: Data-Driven Web Application</h2>
        <FileUpload />
        <SubscriptionPriceInput />
        <DataDisplay />
      </div>
    </AppContext.Provider>
  );
}

export default App;
