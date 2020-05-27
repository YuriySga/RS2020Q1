import React, {Component, PureComponent} from 'react';

class Article extends PureComponent {
    constructor(props) {
        super(props)
    
        this.state = {
            isOpen: props.defaultOpen,
            count: 0
        }
    }

  /*   shouldComponentUpdate(nextProps, nextState) {
        return this.state.isOpen !== nextState.isOpen
    } */

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.defaultOpen !== this.props.defaultOpen) this.setState({
            isOpen: nextProps.defaultOpen
        })

    }

    componentWillUpdate() {
        console.log("componentWillUpdate")
    }



    render() {
        const {article} = this.props
        const body = this.state.isOpen && <section className="card-text">{article.text}</section>
        return (
            <div className="card mx-auto" style = {{width: '50%'}}>
                <div className="card-header">               
                    <h2 onClick = {this.incrementCounter}>
                        {article.title}
                        clicked {this.state.count}
                        <button onClick={this.handleClick} className="btn btn-primary btn-lg float-right">
                            {this.state.isOpen ? 'close' : 'open'}
                        </button>
                    </h2>
                </div>
                <div className="card-body">
                    <h6 className="card-subtitle text-muted">
                        creation date: {(new Date(article.date)).toDateString()}
                    </h6>
                    {body}
                </div>   
            </div>
        )
    }

    incrementCounter = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    handleClick = () => {
        console.log("clicked")
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
}


export default Article