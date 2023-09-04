import React, {
    ChangeEventHandler,
    FC,
    MouseEventHandler,
    PropsWithChildren,
    useState,
} from 'react';
import { Plan } from '../types';
import { TextInput } from './TextInput';
import { Button } from './Button';

const FormRow: FC<PropsWithChildren<{}>> = ({ children }) => {
    return <div className="grid grid-rows-1">{children}</div>;
};

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
            <h2 className="text-lg">Plan</h2>
            <FormRow>
                <label htmlFor="name">Name</label>
                <TextInput
                    id="name"
                    name="name"
                    value={formValues.name}
                    onChange={handleNameChange}
                />
            </FormRow>
            <FormRow>
                <label>Exercises</label>
                <div>
                    <Button onClick={handleAddExerciseClick}>
                        Add Exercise
                    </Button>
                </div>
                <ol className="list-decimal ml-4">
                    {formValues.tone.exercises.map((exercise, index) => (
                        <li key={index}>
                            <TextInput
                                id={`ex${index + exercise}`}
                                value={exercise}
                                onChange={e =>
                                    handleExerciseChange(e.target.value, index)
                                }
                            />
                            <Button
                                onClick={e => {
                                    e.preventDefault();
                                    removeExerciseAt(index);
                                }}
                            >
                                Remove
                            </Button>
                        </li>
                    ))}
                </ol>
            </FormRow>
            <footer>
                <Button type="submit">Save</Button>
            </footer>
        </form>
    );
};
