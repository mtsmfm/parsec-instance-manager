module Mutations
  class RemoveParsecSession < BaseMutation
    field :ok, Boolean, null: false

    argument :id, ID, required: true

    def resolve(id:)
      s = ParsecSession.find(id)
      raise unless s.user_sub == context[:current_user_sub]
      s.delete
      {ok: true}
    end
  end
end
