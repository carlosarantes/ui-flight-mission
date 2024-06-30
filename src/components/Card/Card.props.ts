type TStatuses = 'pre-flight' | 'flight' | 'post-flight'

export type TCardProps = {
    id: string
    title: string
    description?: string
    columnId: string
    status: TStatuses
}