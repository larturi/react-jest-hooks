import { render, screen, fireEvent } from "@testing-library/react";
import { MultipleCustomHooks } from "../../src/03-examples";
import { useCounter } from "../../src/hooks/useCounter";
import { useFetch } from "../../src/hooks/useFetch";

jest.mock('../../src/hooks/useCounter')
jest.mock('../../src/hooks/useFetch')

describe('Tests in <MultipleCustomHooks />', () => {

    const mockIncrement = jest.fn()
    useCounter.mockReturnValue({
        counter: 1,
        increment: mockIncrement
    })

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('should show the default component', () => {
        useFetch.mockReturnValue({
            data: null,
            isLoading: true,
            hasError: false
        })

        render(<MultipleCustomHooks />)      

        expect(screen.getByText('Loading...'))
        expect(screen.getByText('BreakingBad Quotes'))

        const nextButton = screen.getByRole('button', {name: 'Next quote'})
        expect(nextButton.disabled).toBeTruthy()
    })

    test('should to show one Quoute', () => {

        useFetch.mockReturnValue({
            data: [{ author: 'Leandro', quote: 'Hola Mundo' }],
            isLoading: false,
            hasError: null
        })

        render(<MultipleCustomHooks />)

        // screen.debug()
        
        expect(screen.getByText('Hola Mundo')).toBeTruthy()
        expect(screen.getByText('Leandro')).toBeTruthy()

        const nextButton = screen.getByRole('button', {name: 'Next quote'})
        expect(nextButton.disabled).toBeFalsy()
    })

    test('should to call the increment function', () => {
        
        useFetch.mockReturnValue({
            data: [{ author: 'Leandro', quote: 'Hola Mundo' }],
            isLoading: false,
            hasError: null
        })

        render(<MultipleCustomHooks />)
        const nextButton = screen.getByRole('button', {name: 'Next quote'})
        fireEvent.click(nextButton)

        expect(mockIncrement).toHaveBeenCalled()
    })
    
})