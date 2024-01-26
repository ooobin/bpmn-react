import React from 'react';

class Foreach extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: [
                {
                    id: 1,
                    groups: [
                        {
                            id: 1,
                            name: 'A'
                        },
                        {
                            id: 2,
                            name: 'B'
                        }
                    ]
                }
            ]
        };
    }

    componentDidMount() {
        console.log(this.state.classes);
        this.state.classes.forEach(item => {
            item.groups = item.groups.map(item2 => {
                if (item2.id === 1) {
                    return null;
                } else {
                    return item2;
                }
            })
            console.log(item)
        })
    }

    render() {
        return (
            <div id="foreach">
                <h1>循环</h1>
            </div>
        );
    }
}

export default Foreach;
