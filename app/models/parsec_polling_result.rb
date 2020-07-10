class ParsecPollingResult < FirestoreRecord
  attribute :peer_id, :string
  validates :peer_id, presence: true
  attribute :players, :integer
  validates :players, presence: true
  attribute :name, :string
  validates :name, presence: true
  attribute :parsec_running, :boolean
  validates :parsec_running, inclusion: {in: [true, false]}
  attribute :instance_running, :boolean
  validates :instance_running, inclusion: {in: [true, false]}

  attribute :created_at, :time, default: -> { Time.zone.now }
  validates :created_at, presence: true
  attribute :updated_at, :time, default: -> { Time.zone.now }
  validates :updated_at, presence: true

  before_save do
    self.updated_at = Time.zone.now
  end
end
