import { fireEvent, render, screen } from "@testing-library/react";
import { TodoItem } from "../../src/08-useReducer/TodoItem";

describe('Tests in TodoItem.jsx', () => {

    const todo = {
        id: 1,
        description: 'Comprar agua',
        done: false
    }

    const onDeleteTodoMock = jest.fn()
    const onToggleTodoMock = jest.fn()

    beforeEach( () => jest.clearAllMocks() )

    test('should show the pending TODO', () => {
        render(
            <TodoItem 
                todo={todo} 
                onDeleteTodo={onDeleteTodoMock} 
                onToggleTodo={onToggleTodoMock}
            />
        )

        const liElement = screen.getByRole('listitem')
        expect(liElement.className).toBe('list-group-item d-flex justify-content-between')

        const spanElement = screen.getByLabelText('span')
        expect(spanElement.className).toContain('align-self-center')
        expect(spanElement.className).not.toContain('text-decoration-line-through')
    })

    test('should show the completed TODO', () => {
        todo.done = true

        render(
            <TodoItem 
                todo={todo} 
                onDeleteTodo={onDeleteTodoMock} 
                onToggleTodo={onToggleTodoMock}
            />
        )

        const liElement = screen.getByRole('listitem')
        expect(liElement.className).toBe('list-group-item d-flex justify-content-between')

        const spanElement = screen.getByLabelText('span')
        expect(spanElement.className).toBe('align-self-center text-decoration-line-through')
    })

    test('span should call ToggleTodo when click it', () => {
        render(
            <TodoItem 
                todo={todo} 
                onDeleteTodo={onDeleteTodoMock} 
                onToggleTodo={onToggleTodoMock}
            />
        )

        const spanElement = screen.getByLabelText('span')
        fireEvent.click(spanElement)

        expect(onToggleTodoMock).toHaveBeenCalledWith(todo.id)
    })

    test('button should call onDeleteTodo when the button click event occurs', () => {
        render(
            <TodoItem 
                todo={todo} 
                onDeleteTodo={onDeleteTodoMock} 
                onToggleTodo={onToggleTodoMock}
            />
        )

        const deleteButton = screen.getByRole('button')
        fireEvent.click(deleteButton)

        expect(onDeleteTodoMock).toHaveBeenCalledWith(todo.id)
    })
    
})
