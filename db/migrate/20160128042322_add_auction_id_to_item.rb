class AddAuctionIdToItem < ActiveRecord::Migration
  def change
    add_column :items, :auction_id, :integer
  end
end
