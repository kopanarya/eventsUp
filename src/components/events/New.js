
import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

import 'react-datepicker/dist/react-datepicker.css'

import CreatableSelect from 'react-select/lib/Creatable'
import DatePicker from 'react-datepicker'

class EventsNew extends React.Component {

  constructor() {
    super()

    this.state = {
      test: {},
      data: {
        artist: [],
        date: '',
        start: '',
        finish: ''

      },
      errors: {},
      venues: {},
      venue: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.findVenue = this.findVenue.bind(this)
    this.selectVenue = this.selectVenue.bind(this)
    this.handleChangeDate = this.handleChangeDate.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleStartTime = this.handleStartTime.bind(this)
    this.handleFinishTime = this.handleFinishTime.bind(this)


  }


  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    console.log(data)
    this.setState({ data })

  }



  handleSelectChange(e) {
    console.log(e)
    const data = { ...this.state.data, artist: e }
    //console.log(data)
    this.setState({ data })
    console.log(this)
  }




  handleChangeDate(date) {
    console.log(date)

    this.setState({
      data: {
        ...this.state.data,
        date: date
      }
    })
  }

  handleStartTime(date) {
    console.log(date)

    this.setState({
      data: {
        ...this.state.data,
        start: date.getHours() + ':' + date.getMinutes()
      }
    })
  }

  handleFinishTime(date) {
    console.log(date)

    this.setState({
      data: {
        ...this.state.data,
        finish: date.getHours() + ':' + date.getMinutes()
      }
    })
  }





  selectVenue(e){
    //e.preventDefault()

    //console.log(e.target.id)
    //console.log(e.target.postcode)


    this.setState({
      venue: {
        name: e.target.dataset.name,
        postcode: e.target.dataset.postcode,
        skId: e.target.id
      },
      data: {
        venue: e.target.dataset.name,
        postcode: e.target.dataset.postcode,
        skId: e.target.id
      }
    })
    console.log(this)
  }

  findVenue(e){
    e.preventDefault()
    axios.get(`https://api.songkick.com/api/3.0/search/venues.json?query=${this.state.data.venue}&apikey=${process.env.SONG_KICK_KEY}`)
      .then(res => {
        const venues = { ...this.state.venues, venue: res.data.resultsPage.results.venue }
        this.setState({ venues: venues })
        console.log(this.state)
      })

  }

  handleSubmit(e) {
    e.preventDefault()

    const token = Auth.getToken()

    axios.post('/api/events', this.state.data, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(() => this.props.history.push('/events'))
  }





  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-half-desktop is-two-thirds-tablet">
              <form onSubmit={this.findVenue}>
                <div className="field">
                  <label className="label">Venue</label>
                  <div className="control">
                    <input
                      className="input"
                      name="venue"
                      placeholder="The venue of your event!"
                      onChange={this.handleChange}
                      value={this.state.data.venue || ''}
                    />
                  </div>
                  {this.state.errors.name && <div className="help is-danger">{this.state.errors.name}</div>}
                </div>
                <button> Find Venue </button>
              </form>

              {this.state.venues.venue && !this.state.venue.skId &&<div className="columns is-multiline">

                {this.state.venues.venue.map(venue =>{

                  return <div key={venue.id} className="column is-one-quarter" onClick={this.selectVenue} id={venue.id} data-name={venue.displayName} data-postcode={venue.zip}>
                    {venue.displayName}, {venue.city.displayName}
                  </div>
                })}
              </div>}

              <form>

                <div className="field">
                  <label className="label">Artist</label>


                </div>

                < CreatableSelect
                  onChange={this.handleSelectChange}
                  isMulti


                />
              </form>


              <form onSubmit={this.handleSubmit}>
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <input
                      className="input"
                      name="name"
                      placeholder="The name of your event!"
                      onChange={this.handleChange}
                      value={this.state.data.name || ''}
                    />
                  </div>
                  {this.state.errors.name && <div className="help is-danger">{this.state.errors.name}</div>}
                </div>
                <div className="field">
                  <label className="label">Image</label>
                  <div className="control">
                    <input
                      className="input"
                      name="image"
                      placeholder="eg: The poster for your event!"
                      onChange={this.handleChange}
                      value={this.state.data.image || ''}
                    />
                  </div>
                  {this.state.errors.image && <div className="help is-danger">{this.state.errors.image}</div>}
                </div>
                <div className="field">
                  <label className="label">Date</label>
                  {this.state.data.date &&  <h1>{this.state.data.date.toString() || ''}</h1>}
                  <DatePicker
                    onChange={this.handleChangeDate}
                    value={this.state.data.date || ''}
                  />
                  <label className="label">Start Time</label>
                  {this.state.data.start && <h1>{this.state.data.start.toString() || ''}</h1>}
                  <DatePicker
                    showTimeSelect
                    showTimeSelectOnly
                    onChange={this.handleStartTime}
                    value={this.state.data.start || ''}
                  />
                  <label className="label">Finish Time</label>
                  {this.state.data.finish && <h1>{this.state.data.finish.toString()}</h1>}
                  <DatePicker
                    showTimeSelect
                    showTimeSelectOnly
                    onChange={this.handleFinishTime}
                    value={this.state.data.finish || ''}
                  />
                  {this.state.errors.date && <div className="help is-danger">{this.state.errors.date}</div>}
                </div>


                <div className="field">
                  <label className="label">Price</label>
                  <div className="control">
                    <input
                      className="input"
                      name="price"
                      placeholder="the price of your event"
                      onChange={this.handleChange}
                      value={this.state.data.price || ''}
                    />
                  </div>
                  {this.state.errors.date && <div className="help is-danger">{this.state.errors.price}</div>}
                </div>


                <div className="field">
                  <label className="label">Description</label>
                  <div className="control">
                    <input
                      className="textarea"
                      name="description"
                      placeholder="A description of your event"
                      onChange={this.handleChange}
                      value={this.state.data.description || ''}
                    />
                  </div>
                  {this.state.errors.description && <div className="help is-danger">{this.state.errors.description}</div>}
                </div>

                <div className="field">
                  <label className="label">Minimum Age</label>
                  <div className="control">
                    <input
                      className="input"
                      name="minimumAge"
                      placeholder="Minimum Age for the event"
                      onChange={this.handleChange}
                      value={this.state.data.minimumAge || ''}
                    />
                  </div>
                  {this.state.errors.minimumAge && <div className="help is-danger">{this.state.errors.minimumAge}</div>}
                </div>



                <button className="button is-primary">Submit</button>
              </form>

            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default EventsNew