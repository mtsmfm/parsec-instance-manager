module Types
  class ParsecSessionType < Types::BaseObject
    field :id, ID, null: false
    field :hosts, [ParsecHostType], null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false

    def hosts
      uri = URI('https://kessel-api.parsecgaming.com/hosts/')
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
      req = Net::HTTP::Get.new(uri.path, 'Content-Type' => 'application/json', 'Authorization' => 'Bearer ' + object.session_id)
      res = http.request(req)
      if res.code == "403"
        nil
      else
        JSON.parse(res.body)['data']
      end
    end
  end
end
