class StaticPageController < ApplicationController
  def index
    @auctions  = []
    if admin_signed_in?
      @auctions = current_admin.auctions if current_admin.auctions != nil
    end
  end
end
