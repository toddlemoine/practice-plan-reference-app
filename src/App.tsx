import React, { MouseEventHandler, useState } from 'react';
import './App.css';
import { AppState, Plan } from './types';
import { usePlanStore } from './stores/planStore';
import { Modal, PlanForm } from './components';

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
        <div className="App">
            <h1>Plans</h1>
            <div className="toolbar">
                <button className="add" onClick={handleAddPlan}>
                    Add Plan
                </button>
            </div>
            <ol>
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
                            <button
                                data-id={plan.id}
                                onClick={handleEditPlanClick}
                            >
                                Edit
                            </button>
                            <button
                                data-id={plan.id}
                                onClick={handleRemovePlanClick}
                            >
                                Remove
                            </button>
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
