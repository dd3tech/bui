export interface IHeaderType {
  type?: 'warm' | 'success' | 'amount-blue' | 'amount-black' | 'tag' | 'date' | 'link' | 'input',
  title: string,
  key: string,
  filterCallback?: (payload?: any, key?: string) => void,
}

export type IType = keyof IHeaderType["type"]

export interface IDataTable {
  headers: IHeaderType[],
  data: any[]
  page?: number,
}

export interface IPaginatedData {
  numPages?: number
  nextPage?: () => void
  previousPage?: () => void
  blockPaginationWithCount?: () => boolean
}

export interface IParamsPagination {
  skipSlice: number
  limitSlice: number
}