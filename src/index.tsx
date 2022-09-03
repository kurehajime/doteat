import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import GameElement from './compornents/GameElement'
import InitController from './controllers/InitController'
import EnemyLoopController from './controllers/EnemyLoopController'
import TimeController from './controllers/TimeController'
import './index.css'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(<div className='container'>
    <RecoilRoot>
        <GameElement
            cellSize={50} />
        <InitController />
        <TimeController />
        <EnemyLoopController />
    </RecoilRoot>
</div>)