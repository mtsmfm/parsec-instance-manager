import * as React from "react";
import gql from "graphql-tag";
import { ParsecHosts_ParsecHostsFragment } from "../graphql-generated";

export const ParsecHosts = {
  Component: ({ parsecHosts }: { parsecHosts?: ParsecHosts_ParsecHostsFragment[] | undefined | null }) => {
    return <>
      <h2>Parsec hosts</h2>
      {
        parsecHosts === undefined || parsecHosts === null && <>
          PARSEC_SESSION_ID is wrong
        </>
      }
      <ul>
        {parsecHosts && parsecHosts.map(({ name, peerId, players }) =>
          <li key={peerId}>
            <ul>
              <li>
                {peerId}
              </li>
              <li>
                {name}
              </li>
              <li>
                {players}
              </li>
            </ul>
          </li>
        )}
      </ul>
    </>
  },
  Fragments: {
    parsecHosts: gql`
      fragment ParsecHosts_ParsecHosts on ParsecHost {
        name, peerId, players
      }
    `
  }
}
