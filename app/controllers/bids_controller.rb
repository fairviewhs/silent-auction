class BidsController < ApplicationController
  def create
    @bid = Bid.new(bid_params)
    @item = Item.find_by_id(params[:current_item])

    if @bid.higher_price(@item)
      @item.bids << @bid
      if @bid.save
        flash[:notice] = "Bid has been saved."
        redirect_to @item
      else
        flash[:alert] = "Bid did not save."
        @auction = Auction.find_by_id(@item.auction_id)
        render "items/show"
      end
    else
      flash[:alert] = "Bid did not save."
      @auction = Auction.find_by_id(@item.auction_id)
      render "items/show"
    end
  end

  private
    def bid_params
      params.require(:bid).permit(:name, :email, :phone, :bid_price)
    end
end
