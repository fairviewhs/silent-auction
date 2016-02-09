class ItemsController < ApplicationController
  before_action :set_item, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_admin!, only: [:new, :create, :edit, :destroy, :bidders]

  # GET /items
  # GET /items.json
  def index
    @items = Item.all
  end

  # GET /items/1
  # GET /items/1.json
  def show
    @auction = Auction.find_by_id(@item.auction_id)
    @bid = Bid.new
  end

  # GET /items/new
  def new
    @item = Item.new
  end

  # GET /items/1/edit
  def edit
  end

  # POST /items
  def create
    @current_auction = Auction.find_by_id(params[:auction_id])
    @item = Item.new(item_params)

    if @item.save
      @current_auction.items << @item
      redirect_to @current_auction, notice: 'Item was successfully created.'
    else
      flash[:error] = "Item did not save correctly."
      render :new
    end
  end

  # PATCH/PUT /items/1
  # PATCH/PUT /items/1.json
  def update
    respond_to do |format|
      if @item.update(item_params)
        format.html { redirect_to @item, notice: 'Item was successfully updated.' }
        format.json { render :show, status: :ok, location: @item }
      else
        format.html { render :edit }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /items/1
  # DELETE /items/1.json
  def destroy
    @item.destroy
    respond_to do |format|
      format.html { redirect_to root_path, notice: 'Item was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def bidders
    set_item
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_item
      @item = Item.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def item_params
      params.require(:item).permit(:name, :price, :description, :picture, :picture2, :picture3)
    end
end
