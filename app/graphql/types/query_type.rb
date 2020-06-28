module Types
  class QueryType < Types::BaseObject
    field :parsec_sessions, [ParsecSessionType], null: false
    def parsec_sessions
      ParsecSession.from_query(ParsecSession.col.where(:user_sub, :==, context[:current_user_sub])).to_a
    end
  end
end
