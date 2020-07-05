module Types
  class QueryType < Types::BaseObject
    field :gcp_instances, [GcpInstanceType], null: false
    field :parsec_hosts, [ParsecHostType], null: true

    def gcp_instances
      GcpApiClient.new.list_all_instances
    end

    def parsec_hosts
      ParsecApiClient.new.list_hosts
    end
  end
end
