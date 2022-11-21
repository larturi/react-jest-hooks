const { render, screen } = require( "@testing-library/react" );
const { UserContext } = require( "../../src/09-useContext/context/UserContext" );
const { HomePage } = require( "../../src/09-useContext/HomePage" )

describe('Tests en <HomePage />', () => {

    test('should show the component without the user', () => {
        render(
            <UserContext.Provider value={{ user: null }}>
                <HomePage />
            </UserContext.Provider>
        )

        // screen.debug()

        const preTag = screen.getByLabelText('pre')
        expect(preTag.innerHTML).toBe('null')
    })

    test('should show the component with the user', () => {

        const user = {
            id: 12345678,
            name: 'Leandro',
            email: 'leandro@google.com'
        }

        render(
            <UserContext.Provider value={{ user: user }}>
                <HomePage />
            </UserContext.Provider>
        )

        // screen.debug()

        const preTag = screen.getByLabelText('pre')
        expect(preTag.innerHTML).toContain(user.id.toString())
        expect(preTag.innerHTML).toContain(user.name)
        expect(preTag.innerHTML).toContain(user.email)
    })
    
})