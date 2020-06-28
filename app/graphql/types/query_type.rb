module Types
  class QueryType < Types::BaseObject
    field :parsec_sessions, [ParsecSessionType], null: false
    field :instance_management_rules, [InstanceManagementRuleType], null: false

    def parsec_sessions
      ParsecSession.from_query(ParsecSession.col.where(:user_sub, :==, context[:current_user_sub])).to_a
    end

    def instance_management_rules
      InstanceManagementRule.from_query(InstanceManagementRule.col.where(:user_sub, :==, context[:current_user_sub])).to_a
    end
  end
end
