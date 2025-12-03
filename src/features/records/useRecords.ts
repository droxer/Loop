import { useEffect, useState } from 'react';
import { listRecords, subscribeRecords } from './storage';
import { WrongQuestionRecord } from './types';

export const useRecords = () => {
    const [records, setRecords] = useState<WrongQuestionRecord[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Initial fetch
        listRecords().then((data) => {
            setRecords(data);
            setLoading(false);
        });

        // Subscribe to changes
        const unsubscribe = subscribeRecords((newRecords) => {
            setRecords(newRecords);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return { records, loading };
};
