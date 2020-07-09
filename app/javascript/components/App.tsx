import * as React from "react";
import * as firebase from "firebase/app";
import gql from "graphql-tag";
import { useLazyQuery, useMutation } from "../hooks/graphql";
import { AppQuery, AppQueryVariables, RegisterFcmTokenInput } from "../graphql-generated";
import { GcpInstances } from "./GcpInstances";
import { ParsecHosts } from "./ParsecHosts";

const provider = new firebase.auth.GoogleAuthProvider();
const messaging = firebase.messaging();

export const App: React.FC = () => {
  const [isFirebaseLoading, setIsFirebaseLoading] = React.useState(true);
  const [isServiceWorkerLoading, setIsServiceWorkerLoading] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState<firebase.User>();
  const [fcmToken, setFcmToken] = React.useState<string>();
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
  const [registerFcmToken, _] = useMutation<unknown, RegisterFcmTokenInput>(gql`
    mutation RegisterFcmToken($token: String!) {
      registerFcmToken(input: {token: $token}) {
        ok
      }
    }
  `);

  React.useEffect(() => {
    Notification.requestPermission().then((result) => {
      console.log(result);
    });
  }, []);

  React.useEffect(() => {
    navigator.serviceWorker.register('/packs/js/service-worker.js').then(registration => {
      messaging.useServiceWorker(registration);
      setIsServiceWorkerLoading(false);
    });
  }, []);

  React.useEffect(() => {
    return firebase.auth().onAuthStateChanged(user => {
      setIsFirebaseLoading(false);
      setCurrentUser(user || undefined);
    });
  }, [])

  React.useEffect(() => {
    if (!isFirebaseLoading && !isServiceWorkerLoading && currentUser) {
      fetch({});
    }
  }, [isFirebaseLoading, isServiceWorkerLoading, currentUser]);

  React.useEffect(() => {
    if (!isFirebaseLoading && !isServiceWorkerLoading && currentUser && fcmToken) {
      registerFcmToken({ token: fcmToken });
    }
  }, [isFirebaseLoading, isServiceWorkerLoading, currentUser, fcmToken]);

  React.useEffect(() => {
    if (!isServiceWorkerLoading) {
      messaging.getToken().then(token => {
        setFcmToken(token);
      });

      return messaging.onTokenRefresh(() => {
        firebase.messaging().getToken().then(token => {
          setFcmToken(token);
        });
      });
    }
  }, [isServiceWorkerLoading]);

  if (isFirebaseLoading || isServiceWorkerLoading) {
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

    <ul>
      <li>
        <button onClick={() => firebase.auth().signOut()}>Signout</button>
      </li>
    </ul>

    <GcpInstances.Component gcpInstances={data.gcpInstances} />
    <ParsecHosts.Component parsecHosts={data.parsecHosts} />
  </>;
}
