module Types
  class ParsecHostType < Types::BaseObject
    field :players, Integer, null: false
    field :name, String, null: false
    field :peer_id, ID, null: false
  end
end
