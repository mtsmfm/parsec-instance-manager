module Mutations
  class AddParsecSession < BaseMutation
    field :ok, Boolean, null: false

    argument :email, String, required: true
    argument :password, String, required: true
    argument :tfa, String, required: true

    def resolve(email:, password:, tfa:)
      uri = URI('https://api.parsecgaming.com/v1/auth')
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
      req = Net::HTTP::Post.new(uri.path, 'Content-Type' => 'application/json')
      req.body = {email: email, password: password, tfa: tfa}.to_json
      res = http.request(req)
      session_id = JSON.parse(res.body)['session_id']

      ParsecSession.create!(user_sub: context[:current_user_sub], session_id: session_id, email: email)

      {ok: true}
    end
  end
end
