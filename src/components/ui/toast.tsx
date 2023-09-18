import { CheckmarkIcon, ErrorIcon, toast } from "react-hot-toast";

export function toastSuccess(message: string): void {
  toast.custom((t) => (
    <div className={`${t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-lg bg-white shadow-lg text-sm rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 py-3 px-3 items-center justify-start space-x-3`}>
        <CheckmarkIcon />
        <span>{message}</span>
      </div>
  ));
}

export function toastError(message: string): void {
  toast.custom((t) => (
    <div className={`${t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-lg bg-white shadow text-sm rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 py-3 px-3 items-center justify-start space-x-3`}>
        <ErrorIcon />
        <span>{message}</span>
      </div>
  ));
}