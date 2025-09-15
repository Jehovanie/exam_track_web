export interface ExamType {
  id: number;
  studentName: string;
  location: string;
  date: string;
  time: string;
  status: string;
}


export type ExamCreateType = Omit<ExamType, 'id'>;

export interface ExamStats {
  total: number;
  byStatus: {
    canceled: number;
    confirm: number;
    in_organised: number;
    in_search_place: number;
  };
}

