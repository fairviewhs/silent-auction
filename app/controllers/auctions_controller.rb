class AuctionsController < ApplicationController
  before_action :authenticate_admin!, only: [:new, :create]
  def show
    @current_auction = Auction.find_by_id(params[:id])
  end

  def new
    @auction = Auction.new
  end

  def create
    @auction = Auction.new(auction_params)

    if @auction.save
      @auction.admins << current_admin
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
