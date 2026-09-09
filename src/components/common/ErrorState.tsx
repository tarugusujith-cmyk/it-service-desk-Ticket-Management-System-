interface ErrorStateProps {
  message: string
  onRetry?: () => void
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-brick-400/30 bg-brick-50 px-6 py-10 text-center">
      <p className="text-sm font-semibold text-brick-600">Something went wrong</p>
      <p className="max-w-sm text-sm text-ink-500">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-1 rounded-md bg-brick-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-brick-600"
        >
          Try again
        </button>
      )}
    </div>
  )
}
