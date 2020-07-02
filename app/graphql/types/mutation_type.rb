module Types
  class MutationType < Types::BaseObject
    field :reset_gcp_instance, mutation: Mutations::ResetGcpInstance
    field :stop_gcp_instance, mutation: Mutations::StopGcpInstance
    field :start_gcp_instance, mutation: Mutations::StartGcpInstance
  end
end
