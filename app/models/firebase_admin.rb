module FirebaseAdmin
  module Auth
    CERT_URL = URI('https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com')
    MUTEX = Mutex.new

    class << self
      def verify_id_token(token)
        payload, header = JWT.decode(token, nil, true, {
          algorithms: ['RS256'],
          verify_aud: true,
          verify_iss: true,
          verify_iat: true,
          aud: ENV['FIREBASE_PROJECT_ID'],
          iss: "https://securetoken.google.com/#{ENV['FIREBASE_PROJECT_ID']}",
        }) do |header|
          OpenSSL::X509::Certificate.new(public_keys[header['kid']]).public_key
        end

        return payload
      end

      private

      def public_keys
        return @public_keys if @public_keys && @expires_at && @expires_at > Time.zone.now

        MUTEX.synchronize do
          response = Net::HTTP.get_response(CERT_URL)
          max_age_seconds = response.header['cache-control'].scan(/max-age=(\d+)/).flatten[0].to_i
          @expires_at = max_age_seconds.seconds.from_now
          @public_keys = JSON.parse(response.body)
        end

        return @public_keys
      end
    end
  end
end
