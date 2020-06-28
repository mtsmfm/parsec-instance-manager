class InstanceManagementRule < FirestoreRecord
  attribute :user_sub, :string
  attribute :peer_id, :string
  attribute :start_endpoint, :string
  attribute :stop_endpoint, :string
  attribute :reset_endpoint, :string

  attribute :created_at, :time, default: -> { Time.zone.now }
  validates :created_at, presence: true
end
