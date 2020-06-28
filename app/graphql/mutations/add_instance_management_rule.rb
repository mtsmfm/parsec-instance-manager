module Mutations
  class AddInstanceManagementRule < BaseMutation
    field :instance_management_rule, Types::InstanceManagementRuleType, null: false

    argument :peer_id, String, required: true
    argument :start_endpoint, String, required: true
    argument :stop_endpoint, String, required: true
    argument :reset_endpoint, String, required: true

    def resolve(peer_id:, start_endpoint:, stop_endpoint:, reset_endpoint:)
      rule = InstanceManagementRule.create!(
        user_sub: context[:current_user_sub],
        peer_id: peer_id,
        start_endpoint: start_endpoint,
        stop_endpoint: stop_endpoint,
        reset_endpoint: reset_endpoint,
      )

      {instance_management_rule: rule}
    end
  end
end
