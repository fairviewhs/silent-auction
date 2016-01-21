class AuctionsController < ApplicationController
  def new
    @auction = Auction.new
  end

  def create
    #render :text => params
    @newauction = Auction.new(auction_params)

    if @newauction.save
      flash[:success] = "Your auction has been made."
      redirect_to root_path
    else
      flash[:error] = "These was an error while saving"
      render :new
    end
  end

  private
    def auction_params
      params.require(:auction).permit(:name, :host, :description, :start_time, :end_time)
    end
end
