interface Props {
  imageIndex: number
  title: string
  variant: 'middle' | 'bottom'
}

export function SquareCard({ imageIndex, title, variant }: Props) {
  const imageClass = variant === 'middle' ? 'square-image-1' : 'square-image-5'
  const titleClass = variant === 'middle' ? 'square-title' : 'square-title-bottom'

  return (
    <div className="square-card">
      <div
        className={imageClass}
        style={{ backgroundImage: `url('/assets/img-${imageIndex}.png')` }}
      />
      <div className={titleClass}>
        <h4 className="GT-Walsheim-Pro">{title}</h4>
      </div>
    </div>
  )
}
