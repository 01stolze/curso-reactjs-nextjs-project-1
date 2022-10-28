import './styles.css'

export const TextInput = ({searchValue, handleChange}) => {
    return (
    <input
        className='text-input'
        onChange={handleChange}
        type="search"
        placeholder='Type your search!'
        value={searchValue}
        >
    </input>
    )
}