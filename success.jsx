import "./success.css";
function Success({ onSuccessClose }) {
    return (
        <div id="login_signup_success_container" className="login_container">
          <div id="login_signup_success">
            <img src="https://media.tenor.com/bm8Q6yAlsPsAAAAj/verified.gif" alt="loading" />
            <h2>Success!</h2>
            <button onClick={onSuccessClose}>close</button>
          </div>
        </div>
    );
}

export default Success;