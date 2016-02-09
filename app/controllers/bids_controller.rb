class BidsController < ApplicationController
  def create
    @bid = Bid.new(bid_params)
    @item = Item.find_by_id(params[:current_item])

    if (@item.bids.any? && @item.bids.last.bid_price >= @bid.bid_price)
      flash[:alert] = "Someone just outbid you at that price!"
      @bid.errors.add(:bid_price, "was just outmatched by another bidder! Please pick a higher price.")
      @auction = Auction.find_by_id(@item.auction_id)
      render "items/show"
    else
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
  end

  def destroy
    @bid = Bid.find_by_id(params[:id])
    @item = Item.find_by_id(@bid.item_id)
    if @bid.destroy
      flash[:notice] = "Bid was successfully destroyed."
      redirect_to @item
    else
      flash[:error] = "Error when deleting bid."
      render "items/show"
    end
  end

  private
    def bid_params
      params.require(:bid).permit(:name, :email, :phone, :bid_price)
    end
end
