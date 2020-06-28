import * as React from "react";
import gql from "graphql-tag";
import { InstanceManagementRules_InstanceManagementRuleFragment } from "../graphql-generated";

export const InstanceManagementRules = {
  Component: ({ instanceManagementRules }: { instanceManagementRules: InstanceManagementRules_InstanceManagementRuleFragment[] }) => {
    return <>
      <h2>Instance management rules</h2>
      <ul>
        {instanceManagementRules.map(rule => <li key={rule.id}>
          {rule.id}
          <ul>
            <li>{rule.peerId}</li>
            <li>{rule.createdAt}</li>
            <li>{rule.startEndpoint}</li>
            <li>{rule.stopEndpoint}</li>
            <li>{rule.resetEndpoint}</li>
          </ul>
        </li>)}
      </ul>
    </>
  },
  Fragments: {
    instanceManagementRule: gql`
      fragment InstanceManagementRules_InstanceManagementRule on InstanceManagementRule {
        id, createdAt, peerId, startEndpoint, stopEndpoint, resetEndpoint
      }
    `
  }
}
