import type { ResourceQuery, QueryVariables } from 'capture-core-utils/types/app-runtime';

export type QuerySingleResource =
    (resourceQuery: ResourceQuery, variables?: QueryVariables) => Promise<any>;

export type Mutate = (
  params: {resource: string, id?: string, data?: any, type?: 'create' | 'replace' | 'update' | 'delete'},
) => Promise<any>
