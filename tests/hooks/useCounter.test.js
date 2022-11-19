import { renderHook, act } from "@testing-library/react"
import { useCounter } from "../../src/hooks/useCounter"

describe('Tests in useCounter', () => {
    
    test('should return the default values', () => { 
        const { result } = renderHook(() => useCounter())
        const { counter, decrement, increment, reset } = result.current

        expect(counter).toBe(10)
        expect(decrement).toEqual(expect.any(Function))
        expect(increment).toEqual(expect.any(Function))
        expect(reset).toEqual(expect.any(Function))
    })

    test('should show the counter in 100', () => {
        const { result } = renderHook(() => useCounter(100))
        const { counter } = result.current
        expect(counter).toBe(100)
    })

    test('should increment and decrement the counter', () => {
        const { result } = renderHook(() => useCounter(100))
        const { increment, decrement } = result.current

        act(() => {
            increment()
            increment(3)
            decrement(2)
        })

        expect(result.current.counter).toBe(102)
    })

    test('should reset the counter', () => {
        const { result } = renderHook(() => useCounter(100))
        const { increment, reset } = result.current

        act(() => {
            increment(33)
            reset(2)
        })

        expect(result.current.counter).toBe(100)
    })
    
})
