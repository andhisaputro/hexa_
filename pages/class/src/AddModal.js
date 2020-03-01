import React, { Component } from 'react'; 


const AddModal = props => { 
    let className
    let style

    if(props.show) {
      className = 'modal fade show'
      style = {"padding-right": "17px","display":"block"}
    }else{
      className = 'modal fade';
      style     = {"display": "none"}
    }
 
    return ( 
        <div style = {style} class={className} id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Tambah Kelas</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={props.onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              
            {props.children}

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={props.onClose}>Batal</button>
              <button onClick={ props.onSubmit }type="button" class="btn btn-primary">Simpan</button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default AddModal