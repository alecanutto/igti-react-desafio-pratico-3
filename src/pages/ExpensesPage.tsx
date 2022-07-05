import { Box, Container } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import { IExpense } from '../app/interfaces';
import { formatCurrency } from '../helpers/functions';
import { apiGetExpense } from '../services/apiService';

import Loading from '../components/Loading';
import ExpensesTable from '../components/ExpensesTable';
import ExpenseSelect from '../components/ExpenseSelect';

const useStyles = makeStyles(() =>
  createStyles({
    table: {
      paddingBottom: '16px',
    },
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '16px',
    },
    filter: {
      flex: 1,
    },
    loading: {
      width: '100wv',
      height: '100hv',
    },
  })
);

export default function ExpensesPage() {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const { yearMonth } = useParams<{ yearMonth: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await apiGetExpense(yearMonth).then(setExpenses);

      setTimeout(() => {
        setLoading(false);
      }, 500);
    })();
  }, [yearMonth]);

  const total =
    expenses.length > 0
      ? expenses.map(({ amount }) => amount).reduce((sum, value) => sum + value)
      : 0;

  function onChangeYearMonth(newYearMonth: string) {
    navigate(`/expenses/${newYearMonth}`);
  }

  let mainTsx = (
    <Box className={classes.root}>
      <div className={classes.loading}>
        <Loading />
      </div>
    </Box>
  );

  if (!loading) {
    mainTsx = (
      <Container>
        <Box className={classes.root}>
          <Box className={classes.filter}>
            <ExpenseSelect yearMonth={yearMonth} onChange={onChangeYearMonth} />
          </Box>
          <Box>
            Total despesas: <strong>{formatCurrency(total)}</strong>
          </Box>
        </Box>
        <Box className={classes.table}>
          <ExpensesTable expenses={expenses} />
        </Box>
      </Container>
    );
  }

  return <>{mainTsx}</>;
}
