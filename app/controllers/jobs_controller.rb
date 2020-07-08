class JobsController < ApplicationController
  skip_forgery_protection

  def create
    data = JSON.parse(Base64.decode64(params[:message][:data]), symbolize_names: true)
    case data[:job_name]
    when "ParsecStatusPoller"
      ParsecStatusPoller.run
    else
      raise
    end
  end
end
