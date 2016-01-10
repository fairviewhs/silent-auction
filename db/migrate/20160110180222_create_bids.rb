class CreateBids < ActiveRecord::Migration
  def change
    create_table :bids do |t|
      t.integer :user_id
      t.integer :item_id
      t.float :bid_price
      t.datetime :date

      t.timestamps null: false
    end
  end
end
