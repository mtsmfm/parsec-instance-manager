module Types
  class InstanceManagementRuleType < Types::BaseObject
    field :id, ID, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :peer_id, String, null: false
    field :start_endpoint, String, null: false
    field :stop_endpoint, String, null: false
    field :reset_endpoint, String, null: false
  end
end
