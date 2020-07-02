module Types
  class GcpInstanceType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :status, Types::GpcInstanceStatusType, null: false
    field :zone, String, null: false

    def zone
      object.zone.split('/').last
    end
  end
end
