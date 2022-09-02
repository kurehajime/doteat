import ReactDOM from 'react-dom/client'
import GameElement from './compornents/GameElement'
import './index.css'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(<div className='container'>
    <GameElement
        cellSize={100}
    ></GameElement>
</div>)