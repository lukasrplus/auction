import React from 'react'


export default class NominationSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPlayer: null,
      unsoldPlayers: this.props.unsoldPlayers,
      draftId: this.props.draftId
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    $.ajax({
      url: `/drafts/${this.state.draftId}/nominate`,
      type: 'PATCH',
      data: {draft:
        { nominated_player_id: this.state.selectedPlayer,
          id: this.state.draftId
        } }
    })
      .done(response => {
        console.log(response)
      } )
  }

  handleChange = (e) => {
    this.setState({selectedPlayer: e.target.value})
  }



  render(){
    let unsoldPlayers = this.state.unsoldPlayers
    return(
      <div className="box">
        <h3 className="heading-label">Being bid on: </h3>
        <h4 className="waiting">Waiting for nomination from:
          Place Holder
        </h4>
          <form onSubmit={this.handleSubmit}>
            <select name="select" onChange={this.handleChange} className='nomination-input'>
              <option>
                Please nominate a player
              </option>
              {unsoldPlayers.map(function(n) {
                  return (
                    <option
                      key={n.id}
                      value={n.id}
                    >
                      {`${n.player_name}, ${n.position}`}
                    </option>);
              })}
            </select>
            <input type="submit" value="Nominate Player" name="commit" className="nominate" />
          </form>
      </div>
    )
  }
}
