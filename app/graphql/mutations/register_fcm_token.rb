module Mutations
  class RegisterFcmToken < BaseMutation
    field :ok, Boolean, null: false

    argument :token, String, required: true

    def resolve(token:)
      if FcmToken.col.where(:token, :==, token).limit(1).get.count == 0
        FcmToken.create!(user_sub: context[:current_user_sub], token: token)
      end

      {ok: true}
    end
  end
end
