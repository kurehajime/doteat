import { expect, test } from 'vitest'
import { Astar } from '../src/logics/Astar'
import { Utils } from '../src/logics/Utils'

test('ちゃんとゴールする', () => {
    const cells =
        [
            [0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 1, 0],
            [0, 1, 0, 1, 0],
            [0, 0, 1, 1, 0],
        ]
    const [map] = Utils.MakeMap(cells)
    const startPoint = { x: 2, y: 2 }
    const endPoint = { x: 4, y: 4 }
    const path = Astar.findPath(map, startPoint, endPoint)
    expect(path).toEqual([
        { x: 1, y: 2 },
        { x: 0, y: 2 },
        { x: 0, y: 1 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
        { x: 4, y: 0 },
        { x: 4, y: 1 },
        { x: 4, y: 2 },
        { x: 4, y: 3 },
        { x: 4, y: 4 }
    ]
    )
})

test('ちゃんと諦める', () => {
    const cells =
        [
            [0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 1, 0],
            [0, 1, 0, 1, 1],
            [0, 0, 1, 1, 0],
        ]
    const [map] = Utils.MakeMap(cells)
    const startPoint = { x: 2, y: 2 }
    const endPoint = { x: 4, y: 4 }
    const path = Astar.findPath(map, startPoint, endPoint)
    expect(path).toEqual([]
    )
})