import { useState } from 'react';
import { Plan } from '../types';

const randomId = () => Math.random().toString(36).substr(2, 9);

const _store = new Map<string, Plan>();

export const usePlanStore = () => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const _updateStore = () => setPlans(Array.from(_store.values()));

    const listPlans = (): Plan[] => {
        return Array.from(_store.values());
    };

    const getPlan = (id: string): Plan | undefined => {
        return _store.get(id);
    };

    const createPlan = (plan: Plan): void => {
        const id = randomId();
        _store.set(id, { ...plan, id });
        _updateStore();
    };

    const updatePlan = (plan: Plan): void => {
        _store.set(plan.id, plan);
        _updateStore();
    };

    const removePlan = (id: string): void => {
        _store.delete(id);
        _updateStore();
    };

    const initialPlan = (): Plan => {
        return {
            id: '',
            name: '',
            tone: {
                exercises: [''],
                time: 0,
            },
        };
    };

    return {
        plans,
        createPlan,
        getPlan,
        removePlan,
        listPlans,
        updatePlan,
        initialPlan,
    };
};
