class FcmToken < FirestoreRecord
  attribute :token, :string
  validates :token, presence: true
  attribute :user_sub, :string
  validates :user_sub, presence: true

  attribute :created_at, :time, default: -> { Time.zone.now }
  validates :created_at, presence: true
end
