import { render, screen } from "@testing-library/react"
import { PostCard } from "."
import { postCardPropsMock } from "./mock"

const props = postCardPropsMock

describe('<PostCard />', () => {
    it('shoud render PostCarrd correctly', () => {
    render(<PostCard {...props}/>)
    
    expect(screen.getByRole('img', {name: /TITLE 01/i }))
    .toHaveAttribute('src', props.feijao)

    // heading - h1 á h6
    expect(screen.getByRole('heading', {name: /TITLE 01/i })).toBeInTheDocument()
    
    expect(screen.getByText('body 01')).toBeInTheDocument()    
    })
    it('should match snapshot', () => {
        const { container } = render(<PostCard {...props}/>)

        expect(container.firstChild).toMatchSnapshot()
    })
})