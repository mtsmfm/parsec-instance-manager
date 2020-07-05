class GcpApiClient
  def list_all_instances
    ENV['TARGET_AZ_NAMES'].split(',').flat_map do |az|
      service.fetch_all {|token|
        service.list_instances(ENV['FIREBASE_PROJECT_ID'], az, page_token: token)
      }.to_a
    end
  end

  def stop_instance(gcp_instance)
    service.stop_instance(ENV['FIREBASE_PROJECT_ID'], gcp_instance.zone.split('/').last, gcp_instance.id)
  end

  private

  def service
    @service ||= Google::Apis::ComputeV1::ComputeService.new.tap do |s|
      s.authorization = Google::Auth.get_application_default(['https://www.googleapis.com/auth/cloud-platform'])
    end
  end
end
