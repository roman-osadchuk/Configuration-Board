import React from 'react';
import NavigationBar from './NavigationBar';
import FlashMessagesList from './flash/FlashMessagesList';

class App extends React.Component {
    
    // Start one
    // Usin for clear local storage
    // It`s for control actions with jwt 
    
    // componentDitMount() {
    // 	window.localStorage.clear();
    // }

    render() {
        return (
            <div id="root_container">
                <NavigationBar />
                <FlashMessagesList />
                {this.props.children}
            </div>
        );
    }
}

export default App;
