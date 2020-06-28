import * as React from "react";
import * as firebase from "firebase";
import gql from "graphql-tag";
import { useLazyQuery } from "../hooks/graphql";
import { AppQuery, AppQueryVariables } from "../graphql-generated";
import { ParsecSessionForm } from "./ParsecSessionForm";
import { ParsecSessions } from "./ParsecSessions";

const provider = new firebase.auth.GoogleAuthProvider();

export const App: React.FC = () => {
  const [isFirebaseLoading, setIsFirebaseLoading] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState<firebase.User>();
  const [fetch, { data, loading, error }] = useLazyQuery<AppQuery, AppQueryVariables>(gql`
    query App {
      parsecSessions {
        ...ParsecSessions_ParsecSession
      }
    }
    ${ParsecSessions.Fragments.parsecSession}
  `);

  React.useEffect(() => {
    return firebase.auth().onAuthStateChanged(user => {
      setIsFirebaseLoading(false);
      setCurrentUser(user || undefined);
    });
  }, [])

  React.useEffect(() => {
    if (!isFirebaseLoading) {
      fetch({});
    }
  }, [isFirebaseLoading]);

  if (isFirebaseLoading || loading || !data) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error</>;
  }

  if (!currentUser) {
    return <button onClick={() => firebase.auth().signInWithRedirect(provider)}>Login with Google account</button>;
  }

  return <>
    Hello {currentUser.displayName}

    <ParsecSessionForm />

    <ParsecSessions.Component parsecSessions={data.parsecSessions} />

    <ul>
      <li>
        <button onClick={() => firebase.auth().signOut()}>Signout</button>
      </li>
    </ul>
  </>;
}
