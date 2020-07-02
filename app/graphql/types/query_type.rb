module Types
  class QueryType < Types::BaseObject
    field :gcp_instances, [GcpInstanceType], null: false
    field :parsec_hosts, [ParsecHostType], null: true

    def gcp_instances
      service = Google::Apis::ComputeV1::ComputeService.new
      service.authorization = Google::Auth.get_application_default(['https://www.googleapis.com/auth/cloud-platform'])

      ENV['TARGET_AZ_NAMES'].split(',').flat_map do |az|
        service.fetch_all {|token|
          service.list_instances(ENV['FIREBASE_PROJECT_ID'], az, page_token: token)
        }.to_a
      end
    end

    def parsec_hosts
      uri = URI('https://kessel-api.parsecgaming.com/hosts/')
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
      req = Net::HTTP::Get.new(uri.path, 'Content-Type' => 'application/json', 'Authorization' => 'Bearer ' + ENV['PARSEC_SESSION_ID'])
      res = http.request(req)
      if res.code == "403"
        nil
      else
        JSON.parse(res.body)['data']
      end
    end
  end
end
