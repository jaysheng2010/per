import "./error.css";
function ErrorScreen({ onErrorClose, ErrorMessage }) {
    if (!ErrorMessage) {
        ErrorMessage = "An unexpected error occurred. Please try again.";
    }
    return (
        <div id="login_signup_failed_container">
           <div id="login_signup_failed">
             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL2pcBiB5mWS_hJxDZQEvBMNsakG3P4GygTQ&s" alt="loading" />
             <h2>Failed</h2>
             <p>{ErrorMessage}</p>
             <button onClick={onErrorClose}>close</button>
            </div>
        </div>
    );
}

export default ErrorScreen;