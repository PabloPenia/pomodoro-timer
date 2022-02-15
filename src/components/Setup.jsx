import Setter from './Setter'

const Setup = ({ timer, config }) => {
  return (
    <div className="options">
      <Setter name="break" current={timer.break} handler={config.break} />
      <Setter name="session" current={timer.session} handler={config.session} />
    </div>
  )
}

export default Setup
