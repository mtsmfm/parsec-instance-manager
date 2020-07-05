class ParsecApiClient
  class Error < RuntimeError; end

  def list_hosts
    uri = URI('https://kessel-api.parsecgaming.com/hosts/')
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    req = Net::HTTP::Get.new(uri.path, 'Content-Type' => 'application/json', 'Authorization' => 'Bearer ' + ENV['PARSEC_SESSION_ID'])
    res = http.request(req)
    if res.code == "200"
      JSON.parse(res.body, symbolize_names: true)[:data]
    else
      raise Error
    end
  end
end
