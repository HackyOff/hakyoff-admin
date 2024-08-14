/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICtfsChallenge } from "@/interfaces/ctfs/ctfs-intrface";

export interface IMLab {
  lab_id: any;
  course_id: string;
  lab_name: string;
  course_name: string;
  challenges: ICtfsChallenge[];
}
