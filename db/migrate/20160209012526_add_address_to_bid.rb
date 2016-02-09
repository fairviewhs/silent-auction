class AddAddressToBid < ActiveRecord::Migration
  def change
    add_column :bids, :address, :string
  end
end
