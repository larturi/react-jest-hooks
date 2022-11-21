import { render, screen } from "@testing-library/react" 
import { MemoryRouter } from "react-router-dom"
import { MainApp } from  "../../src/09-useContext/MainApp" 

describe('Tests in <MainApp />', () => {

    test('should display the component HomePage', () => {
        render(
            <MemoryRouter>
                <MainApp />
            </MemoryRouter>
        )

        // screen.debug()

        expect(screen.getByText("HomePage")).toBeTruthy()
    })

    test('should display the LoginPage', () => {
        render(
            <MemoryRouter initialEntries={['/login']}>
                <MainApp />
            </MemoryRouter>
        )

        // screen.debug()

        const linkLogin = screen.getByRole("link", {name: "Login"})
        expect(linkLogin.className).toContain("active")
    })
    
})