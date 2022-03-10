export type ClearEmpty<T> = T extends infer K | undefined | null ? K : never;
