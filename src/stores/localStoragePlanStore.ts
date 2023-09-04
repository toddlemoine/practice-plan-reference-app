import { useState } from 'react';
import { Plan } from '../types';
import { randomId } from './utils';

const LOCALSTORAGE_KEY = 'plans';

export const useLocalStoragePlanStore = () => {
    const listPlans = (): Plan[] => {
        return JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || '[]');
    };

    const [plans, setPlans] = useState<Plan[]>(listPlans());

    const _updateStore = (plans: Plan[]) => {
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(plans));
        setPlans(plans);
    };

    const getPlan = (id: string): Plan | undefined => {
        return listPlans().find(plan => plan.id === id);
    };

    const createPlan = (plan: Plan): void => {
        const plans = listPlans();
        plans.push({ ...plan, id: randomId() });
        _updateStore(plans);
    };

    const removePlan = (id: string): void => {
        const plans = listPlans().filter(plan => plan.id !== id);
        _updateStore(plans);
    };

    const updatePlan = (plan: Plan): void => {
        const plans = listPlans().map(p => (p.id === plan.id ? plan : p));
        _updateStore(plans);
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
