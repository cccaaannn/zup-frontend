export interface DataResult<T> {
    status: boolean,
    message: string
    data: T
}