class ChangeBid < ActiveRecord::Migration
  def change
    add_column :bids, :name, :string
    add_column :bids, :email, :string
    add_column :bids, :phone, :string
    remove_column :bids, :user_id
  end
end
