import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import GameElement from './compornents/GameElement'
import GameController from './controllers/GameController'
import './index.css'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(<div className='container'>
    <RecoilRoot>
        <GameElement
            cellSize={50} />
        <GameController
            cellSize={50} />
    </RecoilRoot>
</div>)