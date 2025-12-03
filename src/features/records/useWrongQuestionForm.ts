import { useMemo, useState } from 'react';
import { saveRecord } from './storage';
import { Difficulty, RootCause, WrongQuestionRecord } from './types';

const createDefaultForm = () => ({
    subject: '',
    topic: '',
    question: '',
    correctAnswer: '',
    studentAnswer: '',
    rootCause: 'concept' as RootCause,
    difficulty: 'medium' as Difficulty,
    tags: '',
    notes: ''
});

type FormState = ReturnType<typeof createDefaultForm>;

const REVIEW_OFFSET_DAYS: Record<Difficulty, number> = {
    easy: 5,
    medium: 3,
    hard: 1
};

const requiredFields: (keyof FormState)[] = ['subject', 'topic', 'question', 'studentAnswer'];

const buildRecord = (form: FormState): WrongQuestionRecord => {
    const missing = requiredFields.filter((field) => !form[field]?.trim());
    if (missing.length) {
        throw new Error(`请完善以下字段：${missing.join('、')}`);
    }

    const now = new Date();
    const nextReview = new Date(now);
    nextReview.setDate(now.getDate() + REVIEW_OFFSET_DAYS[form.difficulty]);

    const tags = form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);

    return {
        id: `${Date.now()}`,
        subject: form.subject.trim(),
        topic: form.topic.trim(),
        question: form.question.trim(),
        correctAnswer: form.correctAnswer.trim(),
        studentAnswer: form.studentAnswer.trim(),
        rootCause: form.rootCause,
        difficulty: form.difficulty,
        tags,
        notes: form.notes.trim() || undefined,
        createdAt: now.toISOString(),
        nextReviewAt: nextReview.toISOString()
    };
};

export const useWrongQuestionForm = (initialValues?: Partial<FormState>) => {
    const [form, setForm] = useState<FormState>({ ...createDefaultForm(), ...initialValues });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastSaved, setLastSaved] = useState<WrongQuestionRecord | null>(null);

    const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const resetForm = () => setForm(createDefaultForm());

    const submit = async () => {
        setSubmitting(true);
        setError(null);
        try {
            const record = buildRecord(form);
            await saveRecord(record);
            setLastSaved(record);
            resetForm();
            return record;
        } catch (err) {
            const message = err instanceof Error ? err.message : '提交失败，请稍后再试';
            setError(message);
            throw err;
        } finally {
            setSubmitting(false);
        }
    };

    const summary = useMemo(() => {
        if (!lastSaved) return null;
        return `${lastSaved.subject} · ${lastSaved.topic}`;
    }, [lastSaved]);

    return {
        form,
        updateField,
        submit,
        submitting,
        error,
        summary,
        lastSaved
    };
};
