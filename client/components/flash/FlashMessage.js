import React from 'react';
import classnames from 'classnames';

class FlashMessage extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.deleteFlashMessage(this.props.message.id);
    }

    render() {
        const { id, type, text } = this.props.message;
        return (
            <div style={{width: '80%', margin: '0 auto', position: 'relative'}} className={classnames('alert', {
                'alert-success': type === 'success',
                'alert-danger': type === 'error'
                })}>
                <button onClick={this.onClick} className="close_flash"><span>&times;</span></button>
                {text}
            </div>
        );
    }
}

FlashMessage.propTypes = {
    message: React.PropTypes.object.isRequired,
    deleteFlashMessage: React.PropTypes.func.isRequired
}

export default FlashMessage;
