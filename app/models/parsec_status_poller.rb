class ParsecStatusPoller
  class << self
    def run
      new.run
    end
  end

  def run
    gcp_instances = gcp_api_client.list_all_instances
    parsec_host_by_peer_id = parsec_api_client.list_hosts.index_by {|h| h[:peer_id] }
    parsec_polling_result_by_peer_id = ParsecPollingResult.all.index_by(&:peer_id)

    (parsec_polling_result_by_peer_id.keys + parsec_host_by_peer_id.keys).uniq.each do |peer_id|
      parsec_host = parsec_host_by_peer_id[peer_id]
      parsec_polling_result = parsec_polling_result_by_peer_id[peer_id] || ParsecPollingResult.create!(parsec_host.slice(:peer_id, :players, :name).merge(running: true))

      gcp_instance = gcp_instances.find {|i| match?(gcp_instance: i, parsec_host_name: parsec_polling_result.name) }

      parsec_polling_result.players = parsec_host ? parsec_host[:players] : 0
      parsec_polling_result.running = !!parsec_host

      if parsec_polling_result.changed?
        if parsec_polling_result.changes[:running] == [false, true]
          FcmToken.all.each do |f|
            gcp_api_client.send_message(title: "#{parsec_polling_result.name} started", token: token)
          end
        end

        parsec_polling_result.save!
      else
        if parsec_polling_result.players == 0 && parsec_polling_result.updated_at < 5.minutes.ago
          gcp_api_client.stop_instance(gcp_instance) if gcp_api_client.status == 'RUNNING'

          FcmToken.all.each do |f|
            gcp_api_client.send_message(title: "#{parsec_polling_result.name} is stopped automatically", token: token)
          end
        end
      end
    end
  end

  private

  def gcp_api_client
    @gcp_api_client ||= GcpApiClient.new
  end

  def parsec_api_client
    @parsec_api_client ||= ParsecApiClient.new
  end

  def match?(gcp_instance:, parsec_host_name:)
    gcp_instance.name.upcase == parsec_host_name.upcase
  end
end
