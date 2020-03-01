import React, { Component } from 'react'; 
import Router from 'next/router'


const BreadCrumb = props => {  
    return ( 
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                {
                    props.list.map(item => {
                        return(
                        <li onClick={()=> Router.push('/'+item.path)} class="breadcrumb-item"><a href="#">{item.name}</a></li>  
                        )
                    })
                }
            </ol>
        </nav>
    )
}

export default BreadCrumb