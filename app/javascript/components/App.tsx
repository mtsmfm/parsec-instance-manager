import * as React from "react";
import * as firebase from "firebase";
import gql from "graphql-tag";
import { useLazyQuery } from "../hooks/graphql";
import { AppQuery, AppQueryVariables } from "../graphql-generated";
import { GcpInstances } from "./GcpInstances";
import { ParsecHosts } from "./ParsecHosts";

const provider = new firebase.auth.GoogleAuthProvider();

export const App: React.FC = () => {
  const [isFirebaseLoading, setIsFirebaseLoading] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState<firebase.User>();
  const [fetch, { data, loading, error }] = useLazyQuery<AppQuery, AppQueryVariables>(gql`
    query App {
      gcpInstances {
        ...GcpInstances_GcpInstance
      }
      parsecHosts {
        ...ParsecHosts_ParsecHosts
      }
    }
    ${GcpInstances.Fragments.gcpInstances}
    ${ParsecHosts.Fragments.parsecHosts}
  `);

  React.useEffect(() => {
    return firebase.auth().onAuthStateChanged(user => {
      setIsFirebaseLoading(false);
      setCurrentUser(user || undefined);
    });
  }, [])

  React.useEffect(() => {
    if (!isFirebaseLoading && currentUser) {
      fetch({});
    }
  }, [isFirebaseLoading, currentUser]);

  if (isFirebaseLoading) {
    return <>Loading...</>;
  }

  if (!currentUser) {
    return <button onClick={() => firebase.auth().signInWithRedirect(provider)}>Login with Google account</button>;
  }

  if (loading) {
    return <>Loading...</>;
  }

  if (error || !data) {
    return <>Error</>;
  }

  return <>
    Hello {currentUser.displayName}

    <GcpInstances.Component gcpInstances={data.gcpInstances} />
    <ParsecHosts.Component parsecHosts={data.parsecHosts} />

    <ul>
      <li>
        <button onClick={() => firebase.auth().signOut()}>Signout</button>
      </li>
    </ul>
  </>;
}
