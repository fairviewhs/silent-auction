class RemoveDateFromBid < ActiveRecord::Migration
  def change
    remove_column :bids, :date, :datetime
  end
end
