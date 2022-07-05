import { Fragment } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ExpensesPage from './pages/ExpensesPage';

export default function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/expenses/:yearMonth" element={<ExpensesPage />}></Route>
          <Route path="/" element={<Navigate to="/expenses/2021-06" />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
}
