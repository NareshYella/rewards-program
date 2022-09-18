import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core'

export const Rewards = ({ title, transactions }) => {
    const [totalMoney, setTotalMoney] = useState({ rewards: 0, moneyUsed: 0 });
    const { moneyUsed, rewards } = totalMoney;

    useEffect(() => {
        const totalMoney = transactions.reduce(({ rewards, moneyUsed }, { usedAmount }) => {
            moneyUsed += usedAmount;
            rewards += calcScore(usedAmount);
            return { rewards, moneyUsed }
        }, { rewards: 0, moneyUsed: 0 });

        setTotalMoney(totalMoney)
    }, [transactions]);

    const calcScore = (item) => {
        if (item < 50) return 0;
        if (item < 100) return item - 50;
        return (item - 100) * 2 + 50;
    };

    return (
        <div>
            <Card>
                <CardHeader title={title}></CardHeader>
                <CardContent>
                    <div>
                        <strong>Purchase Total: </strong>
                        <span>${moneyUsed}</span>
                    </div>
                    <div>
                        <strong>Points Earned: </strong>
                        <span>{rewards}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
};
