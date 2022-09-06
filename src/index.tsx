import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import GameElement from './compornents/GameElement'
import InitController from './controllers/InitController'
import LoopController from './controllers/LoopController'
import TimeController from './controllers/TimeController'
import './index.css'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(<div className='container'>
    <RecoilRoot>
        <GameElement
            cellSize={20} />
        <InitController
            cellSize={20} />
        <TimeController />
        <LoopController
            cellSize={20} />
    </RecoilRoot>
</div>)