class BiddersController < ApplicationController
  def index
    @bidders = Bidder.all
  end

  def show
    @bidder = Bidder.find(params[:id])
  end

  def new
    @bidder = Bidder.new
  end

  def create
    @bidder = Bidder.new(bidder_params)
    if @bidder.save
      # continue
    else
      render 'new'
    end
  end

  def edit
  end

  def update
    if @bidder.update_attributes(bidder_params)
      # update
    else
      render 'edit'
    end
  end

  def destroy
    Bidder.find(params[:id]).destroy
  end

  private
    def bidder_params
      params.require(:bidder).permit(:name, :email, :phone)
    end

end
