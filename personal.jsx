
const [personal, personal_fetched] = useState(false);

function fetch_personal() {
    fetch()
    .then(response => response.json)
    .then(data => {
       return data["email"], data["phone_no"], data["date_joined"]
     })
}

function Personal() {
    if (personal_fetched == false) {
        fetch_personal();
    }
    return ();
}


