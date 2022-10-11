import '../sass/App.sass'
import { useState, useRef } from 'react'
import Timer from './Timer'
import Setup from './Setup'
function App() {
	const sound = new Audio(
		'https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'
	)
	const [timer, setTimer] = useState({
		break: 300,
		session: 1500,
		state: 0,
	})
	const [isSession, setIsSession] = useState(true)
	const [timeLeft, setTimeLeft] = useState(1500)
	const [options, setOptions] = useState(false)

	let intervalRef = useRef(null)
	if (timeLeft < 0) {
		sound.play()
		isSession ? setTimeLeft(timer.break) : setTimeLeft(timer.session)
		setIsSession(!isSession)
	}
	const config = {
		break: (value) => {
			if (value > 0 && value <= 3600) {
				setTimer({ break: value, session: timer.session, state: timer.state })
			}
		},
		session: (value) => {
			if (value > 0 && value <= 3600) {
				if (timer.state === 0) setTimeLeft(value)
				setTimer({ break: timer.break, session: value, state: timer.state })
			}
		},
		options: () => {
			if (!options) make.reset()
			return setOptions(!options)
		},
	}
	const count = {
		start: () => {
			intervalRef.current = setInterval(() => {
				setTimeLeft((timeLeft) => {
					if (sound.currentTime && sound.currentTime > 2) {
						sound.currentTime = 0
						sound.pause()
					}
					return timeLeft - 1
				})
			}, 1000)
		},
		stop: () => {
			clearInterval(intervalRef.current)
			intervalRef.current = null
		},
	}
	const make = {
		reset: () => {
			setTimer({
				break: 300,
				session: 1500,
				state: 0,
			})
			setIsSession(true)
			setTimeLeft(1500)
			sound.pause()
			sound.currentTime = 0
			return count.stop()
		},
		playPause: () => {
			// 0: stopped, 1: counting, 2: paused
			timer.state === 0 && setTimeLeft(timer.session)
			if (timer.state === 1) {
				setTimer({ ...timer, state: 2 })
				return count.stop()
			} else {
				setTimer({ ...timer, state: 1 })
				return count.start()
			}
		},
	}

	return (
		<div>
			<h1>Pomodoro Timer</h1>
			<div className='timer'>
				<div className='outer'>
					<div className='inner'>
						{!options ? (
							<Timer
								current={isSession}
								state={timer.state}
								count={timeLeft}
								session={timer.session}
								handler={make}
							/>
						) : (
							<Setup timer={timer} config={config} />
						)}
						<button className='options' onClick={() => config.options()}>
							{options ? 'Done' : 'Config'}
						</button>
					</div>
				</div>
			</div>
			<footer>
				<div>
					<span>
						<small>2021 - 2022</small> | Made with
					</span>
					<a href='https://reactjs.org' target='_blank' rel='noreferrer'>
						React
					</a>
					<span>by</span>
					<a
						href='https://linkedin.com/in/PabloPenia'
						target='_blank'
						rel='noreferrer'
					>
						Pablo Peña
					</a>
				</div>
				<div>
					<small>| Get the</small>
					<a
						href='https://github.com/PabloPenia/pomodoro.git'
						target='_blank'
						rel='noreferrer'
					>
						Source Code
					</a>
				</div>
			</footer>
		</div>
	)
}

export default App
