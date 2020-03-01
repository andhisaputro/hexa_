import Link from 'next/link'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import I18n from '../../lib/translations/i18n'
import Select from 'react-select';

//function
import { getPropertyList } from '../../actions/property/property_action'

// CLASS

class SelectProperty extends Component {
  constructor(props){
    super(props)
  }

  componentWillMount(){
    this.props.dispatch(getPropertyList())
  }

  componentWillReceiveProps(nextProps) {
  }

  render(){
    const formatGroupLabel = data => (
      <div style={groupStyles}>
        <span className="text-primary">{data.label}</span>
        <span className="text-primary" style={groupBadgeStyles}>{data.length}</span>
      </div>
    )

    return(
        <Select
          className="input-select2"
          value={ this.props.value }
          onChange={this.props.onChange}
          inputValue={this.props.inputValue}
          onInputChange={this.props.onInputChange}
          options={this.props.property_list}
          isSearchable={true}
          noOptionsMessage={this.props.noOptionsMessage}
          placeholder="Starting typing city name... "
          formatGroupLabel={formatGroupLabel}
          inputProps={{ autoComplete: 'off', autoCorrect: 'off', spellCheck: 'off' }}
        />
      )
  }
}

function mapStateToProps (state) {
  return{
    property_list : state.propertyReducer.property_list
  }
}

export default connect(mapStateToProps)(SelectProperty)
