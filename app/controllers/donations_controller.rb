class DonationsController < ApplicationController
  before_action :authenticate_admin!, only: [:show, :destroy]

  def index
    @donations = Donation.all
  end

  def new
    @donation = Donation.new
    respond_to do |format|
      format.js { render action: 'new' }
    end
  end

  def show
    @donation = Donation.find_by_id(params[:id])
  end

  def create
    @donation = Donation.new(donation_params)

    if @donation.save
      flash[:success] = "Thank you for your contribution."
      respond_to do |format|
        format.js
      end
    else
      flash[:error] = "These was an error while saving"
      render :new
    end
  end

  def destroy
    @donation = Donation.find_by_id(params[:id])
    @donation.destroy
    respond_to do |format|
      format.js
    end
  end

  private
    def donation_params
      params.require(:donation).permit(:name, :amount, :email, :phone)
    end
end
