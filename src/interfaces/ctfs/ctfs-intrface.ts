/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ICtfsChallenge {
  id: any
  uid?: string
  title: string;
  desc: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  pts: number;
  link?: string
  flag?: string
}

export type ICtfs = {
  id: any
  level: any;
  ctf_code: number;
  module: string;
  ctf: ICtfsChallenge[];
};
