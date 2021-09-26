import React from "react"
import ReactDOM from 'react-dom'
import 'windi.css'
import './styles.css'

const App = () => (
    <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto text-center">
            <h2 className="text-red-500">Hello!</h2>
        </div>
    </div>
)

ReactDOM.render(<App />, document.getElementById('app'))