function Contact({ onClose }) {
    return (
     <div id="contact_page_container">
      <div id="contact_page">
        <h2>Contact information</h2>
        <p className="icon_contact"><i className="fa fa-envelope"></i></p>
        <p>dvesk@</p>
        <p className="icon_contact"><i className="fa fa-phone"></i></p>
        <p>0121234567</p>
        <p className="icon_contact"><i className="fa fa-instagram"></i></p>
        <p>@xxx</p>
        <p id="feel_free">Feel free to contact us if you have any issues.</p>
        <br />
       <button onClick={() => {onClose}}>close</button>
     </div>
    </div>
    );
}

export default Contact;