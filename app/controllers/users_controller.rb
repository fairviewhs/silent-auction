class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      # continue
    else
      render 'new'
    end
  end

  def edit
  end

  def update
    if @user.update_attributes(user_params)
      # update
    else
      render 'edit'
    end
  end

  def destroy
    User.find(params[:id]).destroy
  end

  private
    def user_params
      params.require(:user).permit(:name, :email, :phone)
    end
  end

end
