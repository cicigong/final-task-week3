import React, { Component } from 'react';
import * as moment from 'moment';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';


BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            calendar:[],
            training: {id:'', title:'', start:'', end:''}
        }
    }

    

    componentDidMount() {
        
        this.loadTranings();
        
    }

    loadTranings() {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(res => res.json())
        .then(resData => {
            resData.content.forEach((row) => {
                console.log(row)
                const training = {
                    ...this.state.training, 
                        id: row.links[0].href.substr(49),
                        title: row.activity ,
                        start: new Date(row.date),
                        end: moment(new Date(row.date)).add((row.duration), 'minutes')._d
                }
                this.setState({
                    training,
                    calendar: [...this.state.calendar, training]    
                })
                // console.log(moment(new Date(row.date)).add((row.duration), 'minutes'))
                //console.log(this.state.calendar)
            })
            
        })
    }


  

    render() {
        return (
            <div>
                <React.Fragment>
                    <h2 className="callout">
                        Calendar
                    </h2>
                    
                    <BigCalendar
                        selectable
                        events={this.state.calendar}
                        defaultView="month"
                        scrollToTime={new Date(1970, 1, 1, 6)}
                        defaultDate={new Date(2018, 4, 10)}
                        onSelectEvent={event => alert(event.title)}
                        onSelectSlot={slotInfo =>
                            alert(
                            `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                                `\nend: ${slotInfo.end.toLocaleString()}` +
                                `\naction: ${slotInfo.action}`
                            )
                        }
                    />
                </React.Fragment>
            </div>
        );
    }
}

export default Calendar;