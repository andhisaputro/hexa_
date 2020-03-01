import Link from 'next/link'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import I18n from '../../lib/translations/i18n'
import Select from 'react-select';

//function
import { getProvinceList } from '../../actions/location/location_action'

// CLASS

class SelectProvince extends Component {
  constructor(props){
    super(props)
  }

  componentWillMount(){
    this.props.dispatch(getProvinceList())
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
          options={this.props.province_list}
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
    province_list : state.locationReducer.province_list
  }
}

export default connect(mapStateToProps)(SelectProvince)
