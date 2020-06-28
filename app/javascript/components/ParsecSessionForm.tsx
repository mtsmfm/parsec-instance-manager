import * as React from "react";
import gql from "graphql-tag";
import { useMutation } from "../hooks/graphql";
import { AddParsecSessionInput } from "../graphql-generated";

export const ParsecSessionForm: React.FC = () => {
  const [addParsecSession, { loading, error }] = useMutation<unknown, AddParsecSessionInput>(gql`
    mutation AddParsecSession($email: String!, $password: String!, $tfa: String!) {
      addParsecSession(input: {email: $email, password: $password, tfa: $tfa}) {
        ok
      }
    }
  `);

  const [state, setState] = React.useState<
    { email: string | undefined, password: string | undefined, tfa: string | undefined }
  >({ email: undefined, password: undefined, tfa: undefined });

  if (loading) {
    return <>Loading</>;
  }

  if (error) {
    return <>Error</>;
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault();

      if (state.email && state.password && state.tfa) {
        addParsecSession(state as any);
      }
    }}>

      <input type="email" name="email" value={state.email} onChange={e => setState({ ...state, email: e.target.value })} />
      <input type="password" name="password" value={state.password} onChange={e => setState({ ...state, password: e.target.value })} />
      <input type="text" name="tfa" value={state.tfa} onChange={e => setState({ ...state, tfa: e.target.value })} />

      <button type="submit">Submit</button>
    </form>
  );
}
