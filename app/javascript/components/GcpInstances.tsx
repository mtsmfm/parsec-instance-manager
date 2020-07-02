import * as React from "react";
import gql from "graphql-tag";
import { GcpInstances_GcpInstanceFragment, StartGcpInstanceMutationVariables, StopGcpInstanceMutationVariables, ResetGcpInstanceMutationVariables } from "../graphql-generated";
import { useMutation } from "../hooks/graphql";

const START_GCP_INSTANCE_MUTATION = gql`
  mutation startGcpInstance($id: ID!, $zone: String!) {
    startGcpInstance(input: {
      id: $id, zone: $zone,
    }) {
      ok
    }
  }
`;

const STOP_GCP_INSTANCE_MUTATION = gql`
  mutation stopGcpInstance($id: ID!, $zone: String!) {
    stopGcpInstance(input: {
      id: $id, zone: $zone,
    }) {
      ok
    }
  }
`;

const RESET_GCP_INSTANCE_MUTATION = gql`
  mutation resetGcpInstance($id: ID!, $zone: String!) {
    resetGcpInstance(input: {
      id: $id, zone: $zone,
    }) {
      ok
    }
  }
`;

export const GcpInstances = {
  Component: ({ gcpInstances }: { gcpInstances: GcpInstances_GcpInstanceFragment[] }) => {
    const [startGcpInstance, startGcpInstanceState] = useMutation<unknown, StartGcpInstanceMutationVariables>(START_GCP_INSTANCE_MUTATION);
    const [stopGcpInstance, stopGcpInstanceState] = useMutation<unknown, StopGcpInstanceMutationVariables>(STOP_GCP_INSTANCE_MUTATION);
    const [resetGcpInstance, resetGcpInstanceState] = useMutation<unknown, ResetGcpInstanceMutationVariables>(RESET_GCP_INSTANCE_MUTATION);

    return <>
      <h2>GCP instances</h2>
      <ul>
        {gcpInstances.map(({ id, name, status, zone }) =>
          <li key={id}>
            <ul>
              <li>
                {id}
              </li>
              <li>
                {name}
              </li>
              <li>
                {status}
              </li>
              <li>
                {zone}
              </li>
              {
                status === "TERMINATED" && !startGcpInstanceState.loading && <>
                  <li>
                    <button onClick={() => startGcpInstance({ id, zone })}>Start</button>
                  </li>
                </>
              }
              {
                status === "RUNNING" && !stopGcpInstanceState.loading && !resetGcpInstanceState.loading && <>
                  <li>
                    <button onClick={() => stopGcpInstance({ id, zone })}>Stop</button>
                  </li>
                  <li>
                    <button onClick={() => resetGcpInstance({ id, zone })}>Reset</button>
                  </li>
                </>
              }
            </ul>
          </li>
        )}
      </ul>
    </>
  },
  Fragments: {
    gcpInstances: gql`
      fragment GcpInstances_GcpInstance on GcpInstance {
        id, name, status, zone
      }
    `
  }
}
