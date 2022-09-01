import { expect, test } from 'vitest'
import { Aster } from '../src/logics/Aster'
import { Utils } from '../src/logics/Utils'

test('ちゃんとゴールする', () => {
    const cells =
        [
            [0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 2, 1, 0],
            [0, 1, 0, 1, 0],
            [0, 0, 1, 1, 3],
        ]
    const [map, startPoint, endPoint] = Utils.MakeMap(cells)
    const path = Aster.findPath(map, startPoint, endPoint)
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
            [0, 0, 2, 1, 0],
            [0, 1, 0, 1, 1],
            [0, 0, 1, 1, 3],
        ]
    const [map, startPoint, endPoint] = Utils.MakeMap(cells)
    const path = Aster.findPath(map, startPoint, endPoint)
    expect(path).toEqual([]
    )
})