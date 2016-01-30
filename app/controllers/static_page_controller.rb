class StaticPageController < ApplicationController
  def index
    @myauctions  = []
    @auctions = Auction.all
    if admin_signed_in?
      @myauctions = current_admin.auctions if current_admin.auctions != nil
    end
    @auctions = @auctions - @myauctions
  end
end
