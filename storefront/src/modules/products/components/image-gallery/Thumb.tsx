import React from 'react'

export const Thumb = (props) => {
  const { selected, index, onClick } = props
    console.log(props)
  return (
    <div
      className={'embla-thumbs__slide'.concat(
        selected ? ' embla-thumbs__slide--selected' : ''
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__number"
      >
        <img src={props.index.url} />
      </button>
    </div>
  )
}
