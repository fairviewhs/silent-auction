class AuctionsController < ApplicationController
  def new
    @auction = Auction.new
  end

  def create
    @auction = Auction.new(auction_params)

    if @auction.save
      flash[:notice] = "Your auction has been made."
      redirect_to root_path
    else
      flash[:notice] = "These was an error while saving"
      render :new
    end
  end

  private
    def auction_params
      params.require(:auction).permit(:name, :host, :description, :start_time, :end_time)
    end
end
