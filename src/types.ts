export interface StyleTypes {
  display?: string;
  align?: string;
  justify?: string;
  mg?: string;
  pd?: string;
  font?: string;
  wd?: string;
  hg?: string;
  fdir?: string;
  bgcolor?: string;
  color?: string;
  bold?: boolean;
  radius?: string;
}
export interface ExercisesTypes {
  exercise: string;
  repeat: string;
  count: string;
  weight: string;
}
export interface TrainingTypes {
  title: string;
  training: ExercisesTypes[];
  last: boolean;
}
export interface ContextTrainingTypes {
  allTrainings: TrainingTypes[];
  setAllTrainings: React.Dispatch<React.SetStateAction<TrainingTypes[]>>;
  SetTrainings: (allModifyTrainings: TrainingTypes[]) => Promise<void>;
  GetTrainings: () => Promise<void>;
}
