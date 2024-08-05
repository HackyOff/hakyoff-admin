export interface IMidias {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  github?: string;
}

export interface ITeam {
  id: number;
  picture: string;
  name: string;
  role: string;
  description: string;
  midias?: IMidias;
}
