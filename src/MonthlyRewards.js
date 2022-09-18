import React, { useState, useEffect } from 'react';
import {Rewards} from "./Rewards";

export const MonthlyRewards = ({ item }) => {
    const [months, setMonths] = useState([]);

    useEffect(() => {
        getTransactionsSince(getStartDate(item)).then(setMonths)
    }, [item]);

    const getStartDate = (x) => {
        const startingDate = new Date();
        startingDate.setMonth(startingDate.getMonth() - Math.max(x, 1) + 1);
        startingDate.setDate(1);
        startingDate.setHours(0, 0, 0, 0);
        return startingDate;
    };

    const getTransactionsSince = async (startingDate) => transactionByMonth(generateData(startingDate));

    const generateData = (startingDate) => {
        const [min, max] = [25, 200];
        const length = 200;
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const endingDate = new Date();
        const start = startingDate.getTime();
        const number = endingDate.getTime() - start;

        return Array.from({ length }, () => start + Math.round(Math.random() * number))
            .sort((a, b) => a - b)
            .map((date) => ({
                date,
                month: months[new Date(date).getMonth()],
                usedAmount: min + Math.random() * (max - min) | 0
            }))
    };

    const transactionByMonth = (transactions) => Array.from(Object.entries(transactions.reduce(monthReducer, {})));

    const monthReducer = (account, { month, ...transaction }) => {
        const array = account[month] || [];
        array.push(transaction);
        account[month] = array;
        return account;
    };

    return (
        <div>
            {months.map(([month, transactions]) =>
                <Rewards title={month} transactions={transactions} key={month} />
            )}
        </div>
    )
}
