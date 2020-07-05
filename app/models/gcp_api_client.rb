class GcpApiClient
  def list_all_instances
    ENV['TARGET_AZ_NAMES'].split(',').flat_map do |az|
      compute_service.fetch_all {|token|
        compute_service.list_instances(ENV['FIREBASE_PROJECT_ID'], az, page_token: token)
      }.to_a
    end
  end

  def stop_instance(gcp_instance)
    compute_service.stop_instance(ENV['FIREBASE_PROJECT_ID'], gcp_instance.zone.split('/').last, gcp_instance.id)
  end

  def send_message(title:, body: nil, token:)
    fcm_service.send_message(
      "projects/#{ENV['FIREBASE_PROJECT_ID']}",
      Google::Apis::FcmV1::SendMessageRequest.new(
        message: {
          notification: {
            title: title,
            body: body,
          },
          token: token
        }
      )
    )
  end

  private

  def compute_service
    @compute_service ||= Google::Apis::ComputeV1::ComputeService.new.tap do |s|
      s.authorization = Google::Auth.get_application_default(['https://www.googleapis.com/auth/cloud-platform'])
    end
  end

  def fcm_service
    @fcm_service ||= Google::Apis::FcmV1::FirebaseCloudMessagingService.new.tap do |s|
      s.authorization = Google::Auth.get_application_default(['https://www.googleapis.com/auth/cloud-platform'])
    end
  end
end
