export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type GcpInstance = {
  __typename?: 'GcpInstance';
  id: Scalars['ID'];
  name: Scalars['String'];
  status: GpcInstanceStatus;
  zone: Scalars['String'];
};

export enum GpcInstanceStatus {
  Provisioning = 'PROVISIONING',
  Repairing = 'REPAIRING',
  Running = 'RUNNING',
  Staging = 'STAGING',
  Stopping = 'STOPPING',
  Suspended = 'SUSPENDED',
  Suspending = 'SUSPENDING',
  Terminated = 'TERMINATED'
}

export type Mutation = {
  __typename?: 'Mutation';
  registerFcmToken?: Maybe<RegisterFcmTokenPayload>;
  resetGcpInstance?: Maybe<ResetGcpInstancePayload>;
  startGcpInstance?: Maybe<StartGcpInstancePayload>;
  stopGcpInstance?: Maybe<StopGcpInstancePayload>;
};


export type MutationRegisterFcmTokenArgs = {
  input: RegisterFcmTokenInput;
};


export type MutationResetGcpInstanceArgs = {
  input: ResetGcpInstanceInput;
};


export type MutationStartGcpInstanceArgs = {
  input: StartGcpInstanceInput;
};


export type MutationStopGcpInstanceArgs = {
  input: StopGcpInstanceInput;
};

export type ParsecHost = {
  __typename?: 'ParsecHost';
  name: Scalars['String'];
  peerId: Scalars['ID'];
  players: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  gcpInstances: Array<GcpInstance>;
  parsecHosts?: Maybe<Array<ParsecHost>>;
};

/** Autogenerated input type of RegisterFcmToken */
export type RegisterFcmTokenInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  token: Scalars['String'];
};

/** Autogenerated return type of RegisterFcmToken */
export type RegisterFcmTokenPayload = {
  __typename?: 'RegisterFcmTokenPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

/** Autogenerated input type of ResetGcpInstance */
export type ResetGcpInstanceInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  zone: Scalars['String'];
};

/** Autogenerated return type of ResetGcpInstance */
export type ResetGcpInstancePayload = {
  __typename?: 'ResetGcpInstancePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

/** Autogenerated input type of StartGcpInstance */
export type StartGcpInstanceInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  zone: Scalars['String'];
};

/** Autogenerated return type of StartGcpInstance */
export type StartGcpInstancePayload = {
  __typename?: 'StartGcpInstancePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

/** Autogenerated input type of StopGcpInstance */
export type StopGcpInstanceInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  zone: Scalars['String'];
};

/** Autogenerated return type of StopGcpInstance */
export type StopGcpInstancePayload = {
  __typename?: 'StopGcpInstancePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type AppQueryVariables = Exact<{ [key: string]: never; }>;


export type AppQuery = (
  { __typename?: 'Query' }
  & { gcpInstances: Array<(
    { __typename?: 'GcpInstance' }
    & GcpInstances_GcpInstanceFragment
  )>, parsecHosts?: Maybe<Array<(
    { __typename?: 'ParsecHost' }
    & ParsecHosts_ParsecHostsFragment
  )>> }
);

export type RegisterFcmTokenMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type RegisterFcmTokenMutation = (
  { __typename?: 'Mutation' }
  & { registerFcmToken?: Maybe<(
    { __typename?: 'RegisterFcmTokenPayload' }
    & Pick<RegisterFcmTokenPayload, 'ok'>
  )> }
);

export type StartGcpInstanceMutationVariables = Exact<{
  id: Scalars['ID'];
  zone: Scalars['String'];
}>;


export type StartGcpInstanceMutation = (
  { __typename?: 'Mutation' }
  & { startGcpInstance?: Maybe<(
    { __typename?: 'StartGcpInstancePayload' }
    & Pick<StartGcpInstancePayload, 'ok'>
  )> }
);

export type StopGcpInstanceMutationVariables = Exact<{
  id: Scalars['ID'];
  zone: Scalars['String'];
}>;


export type StopGcpInstanceMutation = (
  { __typename?: 'Mutation' }
  & { stopGcpInstance?: Maybe<(
    { __typename?: 'StopGcpInstancePayload' }
    & Pick<StopGcpInstancePayload, 'ok'>
  )> }
);

export type ResetGcpInstanceMutationVariables = Exact<{
  id: Scalars['ID'];
  zone: Scalars['String'];
}>;


export type ResetGcpInstanceMutation = (
  { __typename?: 'Mutation' }
  & { resetGcpInstance?: Maybe<(
    { __typename?: 'ResetGcpInstancePayload' }
    & Pick<ResetGcpInstancePayload, 'ok'>
  )> }
);

export type GcpInstances_GcpInstanceFragment = (
  { __typename?: 'GcpInstance' }
  & Pick<GcpInstance, 'id' | 'name' | 'status' | 'zone'>
);

export type ParsecHosts_ParsecHostsFragment = (
  { __typename?: 'ParsecHost' }
  & Pick<ParsecHost, 'name' | 'peerId' | 'players'>
);
