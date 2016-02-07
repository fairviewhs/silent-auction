class DropTimeFromAuction < ActiveRecord::Migration
  def down
    change_column :auctions, :start_time, :datetime
    change_column :auctions, :end_time, :datetime
  end

  def up
    change_column :auctions, :start_time, :date
    change_column :auctions, :end_time, :date
  end
end
