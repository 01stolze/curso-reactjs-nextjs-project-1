import './styles.css';
import { Component } from 'react';
import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

// assíncrona (buscar dados de uma api)

class Home extends Component {
  // constructor(props) {
  // super(props)
  // this.handlePClick = this.handlePClick.bind(this)
  // this.  
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 25,
    searchValue: ''
  }
  //}

  componentDidMount() {
    this.loadPosts()
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state // indetificando essas variaveis ao state, nesse escopo

    const postsAndPhotos = await loadPosts()
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    })
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state

    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts)

    console.log(page, postsPerPage, nextPage, nextPage + postsPerPage)

    this.setState({ posts, page: nextPage })
  }

  handleChange = (e) => { // e = evento
    const { value } = e.target
    this.setState({ searchValue: value })
  }


  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state
    const noMorePosts = page + postsPerPage >= allPosts.length

    const filteredPosts = !!searchValue ?
      posts.filter(post => {
        return post.title.toLowerCase()
          .includes(searchValue.toLowerCase())
      })
      :
      posts
    /* !! converte o valor para boolean ; se for uma string vazia
    retorna false, com alguma coisa, true */
    return (
      <section className='container'>
        <div className='search-container'>
        {!!searchValue && (
            <h1>Você está buscando: {searchValue}!</h1>
        )}
          <TextInput
          searchValue={searchValue}
          handleChange={this.handleChange}
          />
        </div>
        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && ( // É BOLEANO GUSTAVO
          <p>Não existem posts =(</p>
        )}

        <div className="button-container">
          {!searchValue && (
            <Button
              title="Carregar mais"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}



// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default Home;
