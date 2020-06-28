module Types
  class MutationType < Types::BaseObject
    field :remove_parsec_session, mutation: Mutations::RemoveParsecSession
    field :add_parsec_session, mutation: Mutations::AddParsecSession
  end
end
