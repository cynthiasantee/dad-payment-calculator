import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { transform } from '../../transform';

export interface DriverPay {
    [key: string]: number
}

export interface HashFileA {
    [key: string]: string
}

export interface HashFileB {
    [key: string]: number
}

export default createSlice({
    name: 'files',
    initialState: {
        fileOne: [] as string[][],
        fileTwo: [] as string[][],
        payPerDriver: {} as DriverPay,
        unfoundLoads: [] as string[]
    },
    reducers: {
        addFileOne: (state, action: PayloadAction<string>) => {
            return {
                'fileOne': transform(action.payload),
                'fileTwo' : state.fileTwo,
                'payPerDriver': state.payPerDriver,
                'unfoundLoads': state.unfoundLoads
            }
        },
        addFileTwo: (state, action: PayloadAction<string>) => {
            return {
                'fileOne': state.fileOne,
                'fileTwo' : transform(action.payload),
                'payPerDriver': state.payPerDriver,
                'unfoundLoads': state.unfoundLoads
            }
        },
        calculate: (state) => {
            const SKIP_FIRST = 1
            const FIRST_LOAD_ID = 4
            const DRIVER = 8
            let hashFileA: HashFileA = {};
            state.fileOne.slice(SKIP_FIRST).forEach((row) => {
                hashFileA[row[FIRST_LOAD_ID]] = row[DRIVER]
            })

            const SECOND_LOAD_ID = 2
            const PAY = 21
            let hashFileB:HashFileB = {};
            state.fileTwo.slice(SKIP_FIRST).forEach((row) => {
                hashFileB[row[SECOND_LOAD_ID]] = parseFloat(row[PAY].replace("$", ""))
            })

            Object.keys(hashFileB).forEach((load, i) => {
                let name:string = hashFileA[load]
                let pay: number = hashFileB[load]
                if (name === undefined) {
                    state.unfoundLoads.push(load)
                } else if (!state.payPerDriver[name]) {
                    state.payPerDriver[name] = 0
                    state.payPerDriver[name] += pay
                } else {
                    state.payPerDriver[name] += pay
                }
            })

            return state
        }
    }
})