export default function FulfilCheckbox({ checked, disabled, onChange }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      disabled={disabled}
      onChange={(e) => onChange(e.target.checked)}
      title={disabled ? 'Cannot mark fulfilled until qty pending is 0' : 'Mark fulfilled'}
    />
  )
}
