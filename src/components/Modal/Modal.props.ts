export type TModalProps = {
    boldTitle: string
    additionalTitle: string
    mainActionTitle: string
    mainActionFn: () => void
    cancelActionFn?: () => void
}