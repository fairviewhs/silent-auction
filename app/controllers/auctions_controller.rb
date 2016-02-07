class AuctionsController < ApplicationController
  before_action :authenticate_admin!, only: [:new, :create, :edit, :destroy]
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
      flash[:notice] = "These was an error while saving."
      render :new
    end
  end

  def edit
    @auction = Auction.find_by_id(params[:id])
  end

  def update
    @auction = Auction.find_by_id(params[:id])
    if @auction.update_attributes(auction_params)
      flash[:notice] = "Your auction has been changed."
      redirect_to auction_path
    else
      flash[:notice] = "These was an error while saving."
      render :edit
    end
  end

  def destroy
    @auction = Auction.find_by_id(params[:id])
    @auction.items.each do |item|
      item.destroy
    end
    if @auction.destroy
      flash[:notice] = "Auction deleted."
      redirect_to root_path
    else
      flash[:error] = "Error when deleting auction."
      render :show
    end
  end

  private
    def auction_params
      params.require(:auction).permit(:name, :host, :description, :start_time, :end_time)
    end
end
