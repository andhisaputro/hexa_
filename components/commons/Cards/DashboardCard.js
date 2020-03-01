import React, { Component } from 'react'; 


const DashboardCard = props => {  
    return ( 
      <div className="col-xl-2 col-md-5 mb-3" onClick={props.onClick}>
      <div className="card border-left-primary shadow h-100 py-2">
        <div className="card-body">
        <i className="fas fa-plus red float-right"></i><br/>
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="h2 mb-0 font-weight-bold text-gray-800">{props.value}</div>
              <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">{props.name}</div>
            </div>
            <div className="col-auto">
              <i className="fas fa-calendar fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default DashboardCard