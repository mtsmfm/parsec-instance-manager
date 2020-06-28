import * as React from "react";
import gql from "graphql-tag";
import { ParsecSessions_ParsecSessionFragment } from "../graphql-generated";

export const ParsecSessions = {
  Component: ({ parsecSessions }: { parsecSessions: ParsecSessions_ParsecSessionFragment[] }) => {
    return <ul>
      {parsecSessions.map(session => <li key={session.id}>
        {session.id}
        {session.createdAt}
        <ul>
          {session.hosts && session.hosts.map(h =>
            <li key={h.peerId}>
              {h.peerId}
              {h.name}
              {h.players}
            </li>
          )}
        </ul>
      </li>)}
    </ul>
  },
  Fragments: {
    parsecSession: gql`
      fragment ParsecSessions_ParsecSession on ParsecSession {
        id, createdAt
        hosts {
          name, players, peerId
        }
      }
    `
  }
}
