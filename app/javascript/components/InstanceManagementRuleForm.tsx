import * as React from "react";
import gql from "graphql-tag";
import { useMutation } from "../hooks/graphql";
import { AddInstanceManagementRuleInput } from "../graphql-generated";

export const InstanceManagementRuleForm: React.FC = () => {
  const [addInstanceManagementRule, { loading, error }] = useMutation<unknown, AddInstanceManagementRuleInput>(gql`
    mutation AddInstanceManegementRule($peerId: String!, $startEndpoint: String!, $stopEndpoint: String!, $resetEndpoint: String!) {
      addInstanceManagementRule(input: {peerId: $peerId, startEndpoint: $startEndpoint, stopEndpoint: $stopEndpoint, resetEndpoint: $resetEndpoint}) {
        instanceManagementRule {
          id
        }
      }
    }
  `);

  const [state, setState] = React.useState<
    { [K in keyof Omit<AddInstanceManagementRuleInput, 'clientMutationId'>]: AddInstanceManagementRuleInput[K] | undefined }
  >({ peerId: undefined, resetEndpoint: undefined, startEndpoint: undefined, stopEndpoint: undefined });

  if (loading) {
    return <>Loading</>;
  }

  if (error) {
    return <>Error</>;
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault();

      if (state.peerId && state.resetEndpoint && state.startEndpoint && state.stopEndpoint) {
        addInstanceManagementRule(state as any);
      }
    }}>

      <input type="text" name="peerId" value={state.peerId} onChange={e => setState({ ...state, peerId: e.target.value })} />
      <input type="text" name="startEndpoint" value={state.startEndpoint} onChange={e => setState({ ...state, startEndpoint: e.target.value })} />
      <input type="text" name="stopEndpoint" value={state.stopEndpoint} onChange={e => setState({ ...state, stopEndpoint: e.target.value })} />
      <input type="text" name="resetEndpoint" value={state.resetEndpoint} onChange={e => setState({ ...state, resetEndpoint: e.target.value })} />

      <button type="submit">Submit</button>
    </form>
  );
}
