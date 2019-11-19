import React from 'react';
import ReactDOM from 'react-dom';

export default function noobControlHoc(WrappedComponent) {
    return class extends React.Component {

        onClick = (evt) => {
            console.log("[noobControlHoc] onClick");
            // Let the parent know that i am clicked. It's up to the parent to dispatch an action
            if (this.props.controlSelected) {
                this.props.controlSelected(this.props);
            }
        }

        componentDidMount() {
            let domNode = ReactDOM.findDOMNode(this);
            if (domNode) {
                domNode.addEventListener('click', this.onClick);
            }            
        }

        render() {
            return <WrappedComponent {...this.props}/>;
        }    
    }
}