import Button from './Button'
const Setter = ({ current, handler, name }) => {
  return (
    <div>
      <h3 id={`${name}-label`}>{name} Length</h3>
      <Button id={`${name}-decrement`} icon="minus" handler={handler} current={current} />
      <p className="big" id={`${name}-length`}>
        {current / 60}
      </p>
      <Button id={`${name}-increment`} icon="plus" handler={handler} current={current} />
    </div>
  )
}

export default Setter
