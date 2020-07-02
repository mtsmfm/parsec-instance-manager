module Mutations
  class StopGcpInstance < BaseMutation
    field :ok, Boolean, null: false

    argument :id, ID, required: true
    argument :zone, String, required: true

    def resolve(id:, zone:)
      service = Google::Apis::ComputeV1::ComputeService.new
      service.authorization = Google::Auth.get_application_default(['https://www.googleapis.com/auth/cloud-platform'])

      service.stop_instance(ENV['FIREBASE_PROJECT_ID'], zone, id)

      {ok: true}
    end
  end
end
