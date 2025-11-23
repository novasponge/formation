import Stick from '../stick';

export type Trace = [string, number, number, string];
export type SortingAlgorithm = (arr: Stick[]) => Trace[];
