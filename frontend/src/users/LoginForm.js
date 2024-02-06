import { useContext, useState } from "react"
import { useHistory } from "react-router"
import { CurrentUserContext } from "../contexts/CurrentUser"

function LoginForm() {

    const history = useHistory()

    const { setCurrentUser } = useContext(CurrentUserContext)

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const [errorMessage, setErrorMessage] = useState(null)

async function handleSubmit(e) {
  e.preventDefault();

  try {
    const response = await fetch(`http://localhost:5000/authentication/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error data:', errorData);
      setErrorMessage(errorData.message);
      return;
    }

    const data = await response.json();
    setCurrentUser(data.user);
    history.push('/');

    console.log('Response data:', data);
  } catch (error) {
    console.error('Error during fetch:', error);
  }
}




    return (
        <main>
            <h1>Login</h1>
            {errorMessage !== null
                ? (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )
                : null
            }
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-sm-6 form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            required
                            value={credentials.email}
                            onChange={e => setCredentials({ ...credentials, email: e.target.value })}
                            className="form-control"
                            id="email"
                            name="email"
                        />
                    </div>
                    <div className="col-sm-6 form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            required
                            value={credentials.password}
                            onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                            className="form-control"
                            id="password"
                            name="password"
                        />
                    </div>
                </div>
                <input className="btn btn-primary" type="submit" value="Login" />
            </form>
        </main>
    )
}

export default LoginForm