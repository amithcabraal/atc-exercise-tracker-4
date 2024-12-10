export interface Exercise {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  duration: number;
  category: 'cardio' | 'strength' | 'flexibility';
}

export interface WorkoutSet {
  id: string;
  exercises: Exercise[];
  restDuration: number;
}