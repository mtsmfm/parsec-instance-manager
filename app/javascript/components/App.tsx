import * as React from "react";
import * as firebase from "firebase";

const provider = new firebase.auth.GoogleAuthProvider();

export const App: React.FC = () => {
  const [isLoading, setLoading] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState<firebase.User>();

  React.useEffect(() => {
    return firebase.auth().onAuthStateChanged(user => {
      setLoading(false);
      setCurrentUser(user || undefined);
    });
  }, [])

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!currentUser) {
    return <button onClick={() => firebase.auth().signInWithRedirect(provider)}>Login with Google account</button>;
  }

  return <>
    Hello {currentUser.displayName}

    <button onClick={() => firebase.auth().signOut()}>Signout</button>
  </>;
}
