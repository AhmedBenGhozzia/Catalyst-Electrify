import React, { Component } from 'react'
import PropTypes from "prop-types";

export default class Button extends Component {
    static defaultProps = {
        color: 'primary'
    }
    static propTypes = {
        value: PropTypes.string.isRequired
    }
  render() {
    const { color, type, value } = this.props;
    return (
        <React.Fragment>
            {(() => {
                switch (type) {
                    case 'rounded':
                        return <button type="button" className={"btn btn-" + color + " btn-rounded"}>{value}</button>
                    case 'outline':
                        return <button type="button" className={"btn btn-outline-" + color + " btn-fw"}>{value}</button>
                    case 'inverse':
                        return <button type="button" className={"btn btn-inverse-" + color + " btn-fw"}>{value}</button>
                    default:
                        return <button type="button" className={"btn btn-" + color + ""}>{value}</button>;
                }
            })()}
        </React.Fragment>
        

    )
  }
}
