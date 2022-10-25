import { Component } from "react";
import './styles.css'
export class Button extends Component {
    render() {
        const { title, onClick, disabled } = this.props
        return (
            <button
                className="button"
                onClick={onClick}
                disabled={disabled}
            >
                {title}
            </button>
        )
    }
}
