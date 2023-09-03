import React, {
    ChangeEventHandler,
    FC,
    MouseEventHandler,
    useState,
} from 'react';
import { Plan } from '../types';

interface Props {
    plan: Plan;
    onSave: (plan: Plan) => void;
}

export const PlanForm: FC<Props> = ({ plan, onSave }) => {
    const [formValues, setFormValues] = useState<Plan>({
        id: plan.id,
        name: plan.name,
        tone: {
            exercises: plan.tone.exercises.slice(),
            time: plan.tone.time,
        },
    });

    const handleSubmit = () => {
        onSave(formValues);
    };

    const handleNameChange: ChangeEventHandler<HTMLInputElement> = e => {
        setFormValues(prevFormValues => {
            const formValues = {
                ...prevFormValues,
            };
            formValues.name = e.target.value;
            return formValues;
        });
    };

    const handleExerciseChange = (val: string, index: number) => {
        setFormValues(prevFormValues => {
            const formValues = {
                ...prevFormValues,
            };
            formValues.tone.exercises[index] = val;
            return formValues;
        });
    };

    const handleAddExerciseClick: MouseEventHandler = e => {
        e.preventDefault();
        const newExercises = [...formValues.tone.exercises].concat('');
        setFormValues(prevFormValues => {
            const formValues = {
                ...prevFormValues,
            };
            formValues.tone.exercises = newExercises;
            return formValues;
        });
    };

    const removeExerciseAt = (index: number) => {
        const newExercises = [...formValues.tone.exercises];
        newExercises.splice(index, 1);
        setFormValues(prevFormValues => {
            const formValues = {
                ...prevFormValues,
            };
            formValues.tone.exercises = newExercises;
            return formValues;
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Plan</h2>
            <div className="form-row">
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    name="name"
                    value={formValues.name}
                    onChange={handleNameChange}
                />
            </div>
            <div className="form-row">
                <label>Exercises</label>
                <div>
                    <button onClick={handleAddExerciseClick}>
                        Add Exercise
                    </button>
                </div>
                {formValues.tone.exercises.map((exercise, index) => (
                    <div key={index}>
                        <input
                            id={`ex${index + exercise}`}
                            value={exercise}
                            onChange={e =>
                                handleExerciseChange(e.target.value, index)
                            }
                        />
                        <button
                            onClick={e => {
                                e.preventDefault();
                                removeExerciseAt(index);
                            }}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
            <footer>
                <button type="submit">Save</button>
            </footer>
        </form>
    );
};
