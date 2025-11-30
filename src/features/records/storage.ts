import AsyncStorage from '@react-native-async-storage/async-storage';
import { WrongQuestionRecord } from './types';

const STORAGE_KEY = 'loop::wrong-questions';

const listeners = new Set<(records: WrongQuestionRecord[]) => void>();

const emit = (records: WrongQuestionRecord[]) => {
  listeners.forEach((listener) => listener(records));
};

export const subscribeRecords = (listener: (records: WrongQuestionRecord[]) => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const listRecords = async (): Promise<WrongQuestionRecord[]> => {
  const value = await AsyncStorage.getItem(STORAGE_KEY);
  if (!value) return [];

  try {
    const parsed = JSON.parse(value) as WrongQuestionRecord[];
    return parsed;
  } catch (error) {
    console.warn('Failed to parse stored records', error);
    return [];
  }
};

export const saveRecord = async (record: WrongQuestionRecord) => {
  const existing = await listRecords();
  const records = [record, ...existing];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  emit(records);
  return record;
};

export const clearRecords = async () => {
  await AsyncStorage.removeItem(STORAGE_KEY);
  emit([]);
};
