interface PlanItem {
    exercises: string[];
    time: number;
}

export interface Plan {
    id: string;
    name: string;
    tone: PlanItem;
}

export interface AppState {
    activePlan: string | null;
}
