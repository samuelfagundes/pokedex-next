import '../styles/components/Button.scss'

interface ButtonProps {
  text: string
  className: string
}

export function Button({ text, className }: ButtonProps) {
  return <button className={className}>{text}</button>
}
