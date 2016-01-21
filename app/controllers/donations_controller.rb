class DonationsController < ApplicationController
  def index
    @donations = Donation.all
  end

  def new
    @donation = Donation.new
    respond_to do |format|
      format.js { render action: 'new' }
    end
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

  private
    def donation_params
      params.require(:donation).permit(:name, :amount, :email, :phone)
    end
end
