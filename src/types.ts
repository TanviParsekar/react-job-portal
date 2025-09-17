export type Lookup = { 
  id: number; 
  title: string; 
};

export type Location = {
  id: number;
  title: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
};

export type Department = { 
  id: number; 
  title: string; 
};

export type Division = { 
  id: number; 
  title: string; 
};

export type FunctionModel = { 
  id: number; 
  title: string; 
};

export type Job = {
  id: number;
  code?: string;
  title: string;
  description: string;
  type?: string;
  positions?: string;
  experience?: string;
  salary?: string;
  industry?: string;
  location?: Location;
  department?: Department;
  division?: Division;
  function?: FunctionModel;
  postedDate?: string;
  closingDate?: string;
  hostedUrl?: string;
  applyUrl?: string;
};
