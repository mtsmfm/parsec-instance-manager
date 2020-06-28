class ParsecSession < FirestoreRecord
  attribute :user_sub, :string
  attribute :session_id, :string
  attribute :email, :string

  validates :user_sub, presence: true
  validates :session_id, presence: true
  validates :email, presence: true

  attribute :created_at, :time, default: -> { Time.zone.now }
  validates :created_at, presence: true
end
