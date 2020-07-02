module Types
  class GpcInstanceStatusType < Types::BaseEnum
    value "PROVISIONING"
    value "STAGING"
    value "RUNNING"
    value "STOPPING"
    value "SUSPENDING"
    value "SUSPENDED"
    value "REPAIRING"
    value "TERMINATED"
  end
end
