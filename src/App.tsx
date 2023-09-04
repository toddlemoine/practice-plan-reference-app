import React, { MouseEventHandler, useState } from 'react';
import './App.css';
import { AppState, Plan } from './types';
import { usePlanStore } from './stores/planStore';
import { Button, Modal, PlanForm } from './components';

function App() {
    const [appState, setAppState] = useState<AppState>({ activePlan: null });
    const { plans, createPlan, updatePlan, removePlan, getPlan, initialPlan } =
        usePlanStore();

    const handleAddPlan = () => {
        setAppState({ ...appState, activePlan: '' });
    };

    const handleEditPlanClick: MouseEventHandler<HTMLButtonElement> = e => {
        setAppState({
            ...appState,
            activePlan: e.currentTarget.getAttribute('data-id'),
        });
    };

    const handleRemovePlanClick: MouseEventHandler<HTMLButtonElement> = e => {
        const planId = e.currentTarget.getAttribute('data-id');
        if (planId) {
            removePlan(planId);
        }
    };

    const handleCloseModal = () => {
        setAppState({ ...appState, activePlan: null });
    };

    const handlePlanSave = (plan: Plan) => {
        if (plan.id) {
            updatePlan(plan);
        } else {
            createPlan(plan);
        }
        setAppState({ ...appState, activePlan: null });
    };

    return (
        <div className="w-full p-6">
            <h1 className="text-3xl font-bold">Plans</h1>
            <div className="my-2">
                <Button onClick={handleAddPlan}>Add Plan</Button>
            </div>
            <ol className="list-decimal">
                {plans.map(plan => (
                    <li key={plan.id}>
                        <div className="plan">
                            <div className="plan-header">
                                <h2>{plan.name}</h2>
                            </div>
                            <div className="plan-body">
                                Tone exercises: {plan.tone.exercises.join(', ')}
                            </div>
                        </div>
                        <div>
                            <Button
                                data-id={plan.id}
                                onClick={handleEditPlanClick}
                            >
                                Edit
                            </Button>
                            <Button
                                data-id={plan.id}
                                onClick={handleRemovePlanClick}
                            >
                                Remove
                            </Button>
                        </div>
                    </li>
                ))}
            </ol>
            {appState.activePlan !== null && (
                <Modal onClose={handleCloseModal}>
                    <PlanForm
                        onSave={handlePlanSave}
                        plan={
                            appState.activePlan.length
                                ? (getPlan(appState.activePlan) as Plan)
                                : initialPlan()
                        }
                    />
                </Modal>
            )}
        </div>
    );
}

export default App;
