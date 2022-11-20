import { todoReducer } from "../../src/08-useReducer/todoReducer"

describe('Tests en todoReducer.js', () => { 

    const initialState = [{
        id: 1,
        description: 'Demo TODO',
        done: false
    }]

    test('should show the initial state', () => {
        const newState = todoReducer(initialState, {})
        expect(newState).toBe(initialState)
    })

    test('should add a new todo', () => {
        const action = {
            type: '[TODO] Add Todo',
            payload: {
                id: 2,
                description: 'Nuevo TODO',
                done: false
            }
        }

        const newState = todoReducer(initialState, action)

        expect(newState.length).toBe(2)
        expect(newState).toContain(action.payload)
    })

    test('should delete one todo', () => {
        const action = {
            type: '[TODO] Remove Todo',
            payload: 1
        }

        const newState = todoReducer(initialState, action)
        expect(newState.length).toBe(0)
    })

    test('should toogle one todo', () => {
        const action = {
            type: '[TODO] Toggle Todo',
            payload: 1
        }

        const newState = todoReducer(initialState, action)
        expect(newState[0].done).toBe(true)

        const newState2 = todoReducer(newState, action)
        expect(newState2[0].done).toBe(false)
    })

})