
import { useState } from 'react'
import './App.css'

function App() {

	cont [input, setInput] = useState(' ')
	
	return (
     
		<div className="w-full h-screen text-white px-8">
       			<nav className='w-full p-3 flex justify-between items-center'>
     				<h1 className='font-bold tracking-wide text-3xl'>Weather App</h1>
				<div className='bg-white w-[15rem] overflow-hidden shawdow-2xl rounded flex items-center p-2 gap-2'>
					<img src={} alt="Search" />
					<input type="text" className='focus:outline-none w-full text-[#212121] text-lg' value={input} onChange={ e =>setInput(e.target.value)} /> 
				</div>
			</nav>
		</div>
	)
}

export default App
