import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import Home from '.'
import { rest } from 'msw' // interceptar a chamada .fetch
import { setupServer } from 'msw/node'
import userEvent from '@testing-library/user-event'

// req = requisição, res = resposta, ctx = contexto

const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/posts', async (req, res, ctx) => {
    console.log('A CHAMADA FOI INTERCEPTADA!') // URL ACIMA
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title 1',
          body: 'body 1',
        },
        {
          userId: 2,
          id: 2,
          title: 'title 2',
          body: 'body 2',
        },
        {
          userId: 3,
          id: 3,
          title: 'title 3',
          body: 'body 3',
        },
      ]),
    )
  }),
  rest.get('https://jsonplaceholder.typicode.com/photos', async (req, res, ctx) => {
    //Warning: Failed prop type: The prop `feijao` is marked as
    // required in `PostCard`, but its value is `undefined`.
    return res(
      ctx.json([
        {
          url: 'img/img1.png',
        },
        {
          url: 'img/img3.png',
        },
        {
          url: 'img/img3.png',
        },
      ]),
    )
  }),
]

const server = setupServer(...handlers)

describe('<Home />', () => {
  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'bypass' }) // ligar servidor // bypass ignore warns
  })

  afterEach(() => {
    server.resetHandlers() // para um teste não afetar o outro
  })

  afterAll(() => {
    server.close() // desligar servidor
  })

  it('should render search, posts and load more', async () => {
    render(<Home />)

    const noMorePosts = screen.getByText('Não existem posts =(')

    expect.assertions(3)

    await waitForElementToBeRemoved(noMorePosts)
    //testar se o search está na tela
    const search = screen.getByPlaceholderText(/type your search/i)
    expect(search).toBeInTheDocument()
    //testar se há realmente 10 posts, usando tática de cada post tem uma img
    const img = screen.getAllByRole('img')
    expect(img).toHaveLength(3)
    //testar se há botão na tela
    const button = screen.getByRole('button', { name: /load more posts/i })
    expect(button).toBeInTheDocument()
  })
  it('should search for posts', async () => {
    render(<Home />)
    const noMorePosts = screen.getByText('Não existem posts =(')

    await waitForElementToBeRemoved(noMorePosts)
    //get levanta um erro quando um elemento não existe
    //query retorna 'null' se o elemento não existe
    const search = screen.getByPlaceholderText(/type your search/i)

    expect(screen.getByRole('heading', { name: /title 1/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /title 2/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /title 3/i })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /title 4/i })).not.toBeInTheDocument()

    userEvent.type(search, 'title 2')
    expect(screen.getByRole('heading', { name: /title 2 2/i })).toBeInTheDocument()
    // testar o search value no H1
    expect(screen.getByRole('heading', { name: 'Search value: title 2' })).toBeInTheDocument()

    userEvent.clear(search)
    expect(screen.getByRole('heading', { name: /title 1/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /title 2/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /title 3/i })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /title 4/i })).not.toBeInTheDocument()

    // testar se aparecerá 'não existem posts' caso search value não encontre

    userEvent.type(search, 'blabla')
    expect(screen.getByText('Não existem posts =('))
  })
  // testar button

  it('should load more posts', async () => {
    render(<Home />)
    const noMorePosts = screen.getByText('Não existem posts =(')
    await waitForElementToBeRemoved(noMorePosts)

    const button = screen.getByRole('button', { name: /load more posts/i })

    userEvent.click(button)
    expect(screen.getByRole('heading', { name: /title 3/i })).toBeInTheDocument()
    expect(button).toBeDisabled()
  })
})
