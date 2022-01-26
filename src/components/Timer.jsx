const Timer = ({ current, handler, state, session, count }) => {
  const toMinutes = value => {
    if (value === 3600) {
      return 60 + new Date(value * 1000).toISOString().slice(16, -5)
    } else {
      return new Date(value * 1000).toISOString().slice(14, -5)
    }
  }
  return (
    <div className="clock">
      <h3 id="timer-label">{current ? 'Session' : 'Break'}</h3>
      <button id="start_stop" onClick={handler.playPause}>
        <i className={`fas fa-${state === 1 ? 'pause' : 'play'}`}></i>
      </button>
      <p className="big" id="time-left">
        {state === 0 ? toMinutes(session) : toMinutes(count)}
      </p>
      <button id="reset" onClick={handler.reset}>
        <i className="fas fa-sync-alt"></i>
      </button>
    </div>
  )
}

export default Timer
