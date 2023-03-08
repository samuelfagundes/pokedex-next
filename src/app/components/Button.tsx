import '../styles/components/Button.scss'

interface ButtonProps {
  text: string
  className: string
  onClick: () => void
}

export function Button({ text, onClick, className }: ButtonProps) {
  return (
    <button onClick={onClick} className={className}>
      {text}
    </button>
  )
}
