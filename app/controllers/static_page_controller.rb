class StaticPageController < ApplicationController
  def index
    if admin_signed_in?
      @auctions = current_admin.auctions
    end
  end
end
