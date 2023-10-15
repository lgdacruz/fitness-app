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
}
export interface ContextTrainingTypes {
  GetTraining: () => void;
  GetSettings: () => Promise<void>;
  settings: SettingsTypes;
  training: TrainingTypes[];
  setTraining: React.Dispatch<React.SetStateAction<TrainingTypes[]>>;
  removeStorage: () => Promise<void>;
  nonPersonalizedAd: boolean;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface SettingsTypes {
  language: string;
  measure: string;
}
