function Error({ onCloseError }) {
    return (
        <div id="login_signup_failed_container" className="login_container">
           <div id="login_signup_failed">
             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL2pcBiB5mWS_hJxDZQEvBMNsakG3P4GygTQ&s" alt="loading" style="width: 90px; height: 90px;"/>
             <h2>Failed</h2>
             <p>Could not find email</p>
             <button onClick={onCloseError}>close</button>
            </div>
        </div>
    );
}

export default Error;