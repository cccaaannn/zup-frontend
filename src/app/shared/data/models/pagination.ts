export interface Pagination<T> {
    content: T;
    size: number;
    page: number;
    sort: string | any;
    totalElements: number;
    totalPages: number;
}