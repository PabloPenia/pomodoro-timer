const Timer = ({ current, handler, state, session, count }) => {
	const toMinutes = (value) => {
		if (value === 3600) {
			return 60 + new Date(value * 1000).toISOString().slice(16, -5)
		} else {
			return new Date(value * 1000).toISOString().slice(14, -5)
		}
	}
	return (
		<>
			<h2 id='time-left'>
				{state === 0 ? toMinutes(session) : toMinutes(count)}
			</h2>
			<h3 id='timer-label'>{current ? 'Session' : 'Break'}</h3>
			<div className='buttons'>
				<button id='start_stop' onClick={handler.playPause}>
					<i className={`fas fa-${state === 1 ? 'pause' : 'play'}`}></i>
					<span>{state === 1 ? 'pause' : 'play'}</span>
				</button>
				<button id='reset' onClick={handler.reset}>
					<i className='fas fa-sync-alt'></i>
					<span>reset</span>
				</button>
			</div>
		</>
	)
}

export default Timer
