import { fireEvent, render, screen } from "@testing-library/react"
import { UserContext } from "../../src/09-useContext/context/UserContext"
import { LoginPage } from "../../src/09-useContext/LoginPage"

describe('Test in <LoginPage />', () => {

    test('should display the component without the user ', () => {

        render(
            <UserContext.Provider value={{ user: null }}>
                <LoginPage />
            </UserContext.Provider>
        )

        const preTag = screen.getByLabelText("pre")
        expect(preTag.innerHTML).toBe("null")
        
    })
    
    test('should call setUser when the click event in the button occurs ', () => {
        
        const setUserMock = jest.fn()

        render(
            <UserContext.Provider value={{ user: null, setUser: setUserMock }}>
                <LoginPage />
            </UserContext.Provider>
        )

        const button = screen.getByRole('button', {name: 'Establecer usuario'})
        fireEvent.click(button)

        expect(setUserMock).toHaveBeenCalledWith( {"email": "juan@google.com", "id": 123, "name": "Juan"} )

    })

});
