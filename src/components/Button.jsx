const Button = ({ icon, id, handler, current }) => {
  return (
    <button id={id} onClick={() => (icon === 'plus' ? handler(current + 60) : handler(current - 60))}>
      <i className={`fas fa-${icon}`}></i>
    </button>
  )
}

export default Button
