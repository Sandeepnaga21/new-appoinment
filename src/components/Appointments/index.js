import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {AppointmentList: [], name: '', date: '', isFavorite: false}

  toggleIsFavorite = id => {
    const {isFavorite} = this.state
    this.setState(prevState => ({
      AppointmentList: prevState.AppointmentList.map(each => {
        if (id === each.id) {
          return {...each, isFavorite: !each.isFavorite}
        }
        return each
      }),
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()

    const {name, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      name,
      date,
      isFavorite: false,
    }
    this.setState(prevState => ({
      AppointmentList: [...prevState.AppointmentList, newAppointment],
      name: '',
      date: '',
    }))
  }

  onChangeName = event => {
    this.setState({
      name: event.target.value,
    })
  }

  onChangeDate = event => {
    const selectedDate = new Date(event.target.value)
    const formattedDate = format(selectedDate, 'dd MMMM yyyy, EEEE')

    this.setState({
      date: formattedDate,
    })
  }

  render() {
    const {AppointmentList} = this.state
    const {name, date} = this.state

    return (
      <div className="app-container">
        <form className="form" onSubmit={this.onAddAppointment}>
          <h1 className="title">Add Appointment</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            className="img"
            alt="appointments"
          />
          <label htmlFor="title" className="label">
            TITLE
          </label>
          <input
            id="title"
            type="text"
            onChange={this.onChangeName}
            value={name}
          />
          <label htmlFor="date" className="label">
            DATE
          </label>
          <input
            id="date"
            type="text"
            onChange={this.onChangeDate}
            value={date}
          />
          <button className="button">Add</button>
          <hr />
          <h1 className="appointment">Appointments</h1>
          <button className="star">Starred</button>
          <ul className="list">
            <AppointmentItem
              appointmentDetails={AppointmentList}
              toggleIsFavorite={this.toggleIsFavorite}
            />
          </ul>
        </form>
      </div>
    )
  }
}

export default Appointments
