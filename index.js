class Base extends React.Component {
  componentWillMount() {
    this.state = {isFinishedAuth: false};
    firebase.auth().onAuthStateChanged(user => {
      this.setState({isFinishedAuth: true, user});
    });
  }
  render() {
    const {user, isFinishedAuth} = this.state;
    return (
      <div>
        <h1>Firebase Notes App</h1>
        {isFinishedAuth && !user && <Login />}
        {user && <Notes user={user} />}
        {user && <Logout />}
      </div>
    );
  }
}

class Logout extends React.Component {
  handleLogout(event) {
    event.preventDefault();
    firebase.auth().signOut();
  }
  render() {
    return (
      <div>
        <button name="logout" onClick={this.handleLogout.bind(this)}>
          Logout
        </button>
      </div>
    );
  }
}

class Login extends React.Component {
  componentWillMount() {
    this.state = {email: "", password: "", error: {}};
  }
  handleLogin(event) {
    event.preventDefault();
    const {email, password} = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.setState({error});
      });
  }
  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }
  render() {
    const {error, email, password} = this.state;
    return (
      <div>
        <h3>Login</h3>
        <div id="login-error" data-error-code={error.code}>
          {error.message}
        </div>
        <form onSubmit={this.handleLogin.bind(this)}>
          <input
            name="email"
            type="text"
            placeholder="email"
            value={email}
            onChange={this.handleEmailChange.bind(this)}
          />
          <input
            name="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={this.handlePasswordChange.bind(this)}
          />
          <button name="login" type="submit">
            Login
          </button>
        </form>
      </div>
    );
  }
}

class Notes extends React.Component {
  componentWillMount() {
    this.state = {notes: [], text: ""};
    const {user} = this.props;
    const notesRef = firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .collection("notes");
    notesRef.onSnapshot(snapshot => {
      this.setState({notes: snapshot.docs});
    });
  }
  handleAdd(event) {
    const {text} = this.state;
    const {user} = this.props;
    event.preventDefault();
    const notesRef = firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .collection("notes");
    notesRef.add({created: Date.now(), text});
    this.setState({text: ""});
  }
  handleNoteChange(event) {
    this.setState({text: event.target.value});
  }
  render() {
    const {notes} = this.state;
    const {user} = this.props;
    return (
      <div>
        <h3 id="user">{user.email}</h3>
        {notes && (
          <ul id="notes">
            {notes.map(note => (
              <li key={note.data().created}>{note.data().text}</li>
            ))}
          </ul>
        )}
        {!notes && <div id="no-notes">No notes</div>}
        <form onSubmit={this.handleAdd.bind(this)}>
          <input
            name="note"
            type="text"
            placeholder="note"
            onChange={this.handleNoteChange.bind(this)}
          />
          <button name="add" type="submit">
            Add
          </button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<Base />, document.getElementById("container"));
