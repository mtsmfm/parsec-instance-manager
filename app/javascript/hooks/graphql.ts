import * as firebase from "firebase/app";
import { useState, useEffect, useRef } from "react";
import { DocumentNode, print } from "graphql";

const postQuery = async <TData, TVariables>(query: string, variables: TVariables) => {
  const token = await firebase.auth().currentUser!.getIdToken();

  const resonse = await fetch('/graphql', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${token}`,
      'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')!.getAttribute('content')!
    },
    body: JSON.stringify({ query, variables })
  });

  const json: { data: TData, errors: Array<any> | undefined } = await resonse.json();

  return json;
}

interface QueryState<TData> {
  loading: boolean;
  error: boolean;
  data: TData | undefined;
}

const useIsMountedRef = () => {
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => { isMountedRef.current = false };
  }, []);

  return isMountedRef;
}

export const useLazyQuery = <TData, TVariables>(query: DocumentNode) => {
  const [state, setState] = useState<QueryState<TData>>({ loading: false, error: false, data: undefined });
  const isMountedRef = useIsMountedRef();

  const func = async (variables: TVariables) => {
    setState({ loading: true, error: false, data: undefined });

    try {
      const { data, errors } = await postQuery<TData, TVariables>(print(query), variables);

      if (isMountedRef.current) {
        setState({ loading: false, error: !!errors, data });
      }
    } catch {
      setState({ loading: false, error: true, data: undefined });
    }
  }

  return [func, state] as const;
}

export const useQuery = <TData, TVariables>(query: DocumentNode, variables: TVariables) => {
  const [func, state] = useLazyQuery<TData, TVariables>(query);

  useEffect(() => {
    func(variables);
  }, []);

  return state;
}

export const useMutation = useLazyQuery;
