import { render, screen } from "@testing-library/react"
import { Posts } from "."

const props = {
    posts: [
        {   // indice 0
            id: 1,
            title: 'title 1',
            body: 'body 1',
            feijao: 'img/img1.png'
        },
        {   // indice 1
            id: 2,
            title: 'title 2',
            body: 'body 2',
            feijao: 'img/img2.png'
        },
        {   // indice 2
            id: 3,
            title: 'title 3',
            body: 'body 3',
            feijao: 'img/img3.png'
        },
    ]
}

describe('<Posts />', () => {
    it('should render posts', () => {
        render(<Posts {...props} />)

        expect(screen.getAllByRole('heading', { name: /title/i }))
            .toHaveLength(3)
        expect(screen.getAllByRole('img', { name: /title/i }))
            .toHaveLength(3)
        expect(screen.getAllByText(/body/i))
            .toHaveLength(3)

        expect(screen.getByRole('img', { name: 'title 3' }))
            .toHaveAttribute('src', 'img/img3.png')
    })
    it('should not render posts', () => {
        render(<Posts />)
        expect(screen.queryByRole('heading', { name: /title/i }))
            .not.toBeInTheDocument()

    })
    it('should match snapshot', () => {
        const { container } = render(<Posts {...props} />)

        expect(container.firstChild).toMatchSnapshot()
    })
})