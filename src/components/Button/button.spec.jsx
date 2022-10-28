import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Button } from "."

describe('<Button />', () => {
    it('should render the button with the text "Load More"', () => {
        render(<Button text="Load more" />)
        expect.assertions(1) // espera-se uma asserção(expect).

        const button = screen.getByRole('button', { name: /load more/i })
        expect(button).toBeInTheDocument()
    })
    
    it('should function OnClick be working', () => {
        const fn = jest.fn()
        render(<Button onClick={fn}/>)

        const button = screen.getByRole('button')

        userEvent.click(button) // ou fireEvent

        expect(fn).toHaveBeenCalledTimes(1)
    })
    it('should be disabled when disabled is true', () => {
        render(<Button disabled={true}/>)

        const button = screen.getByRole('button')

        expect(button).toBeDisabled()
    })
    it('should match snapshot', () => {
        const fn = jest.fn()
        const {container} = render(<Button text="Load more" disabled={true} onClick={fn} />)

        expect(container.firstChild).toMatchSnapshot()
    })
})