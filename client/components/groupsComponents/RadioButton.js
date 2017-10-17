import React, {Component} from 'react'


export default class RadioButton extends Component {

    render() {
        return (
            <label className="radioButton">
                <input type="radio"
                    value={this.props.theme} 
                    checked={this.props.isActive}
                    onChange={this.props.toggle}
                />
                <div className="slider round"></div>
            </label>         
        );
    }
}