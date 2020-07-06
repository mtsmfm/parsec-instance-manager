class JobsController < ApplicationController
  skip_forgery_protection

  def create
    case params[:job_name]
    when "ParsecStatusPoller"
      ParsecStatusPoller.run
    else
      raise
    end
  end
end
