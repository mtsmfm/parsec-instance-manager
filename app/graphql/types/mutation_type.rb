module Types
  class MutationType < Types::BaseObject
    field :add_instance_management_rule, mutation: Mutations::AddInstanceManagementRule
    field :remove_parsec_session, mutation: Mutations::RemoveParsecSession
    field :add_parsec_session, mutation: Mutations::AddParsecSession
  end
end
