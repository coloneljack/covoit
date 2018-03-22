export interface WorkingWeek {
  monday: WorkingDay;
  tuesday: WorkingDay;
  wednesday: WorkingDay;
  thursday: WorkingDay;
  friday: WorkingDay;
}

export interface WorkingDay {
  amStart?: string;
  amEnd?: string;
  pmStart?: string;
  pmEnd?: string;
  idle: boolean;
}
