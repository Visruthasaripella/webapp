import React from 'react'
import "../assets/css/AppFooter.css"

type Props = {}

function Footer({}: Props) {
  return (
    <div id="footer">
    <div className="bg-secondary ">
        <div className="container">
            <div className="row">
                <div className=" col-4 d-flex flex-row text-white p-3" >
                    <i className="fa-regular fa-copyright"></i>
                    <p className="pl-2"> 2023 VISRUTA.ALL RIGHTS RESERVED</p>
                </div>
                <div className=" col-4 text-white p-3  d-flex flex-column" >
                    <span>Contact Us</span>
                   <div  className="d-flex flex-row">
                      <i className="pr-3"><i className="fa-brands fa-instagram"> instagram</i></i>
                      <i className="pr-3"><i className="fa-brands fa-threads"> treads</i></i>
                      <i className="pr-3"><i className="fa-regular fa-envelope"> gmail</i></i>
                    </div>
                </div>
                 <div className="col-4 text-white p-3">
                     <h6>Directions</h6>
                     <p>Falls church, Virginia</p>
                 </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Footer;