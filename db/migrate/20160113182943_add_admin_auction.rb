class AddAdminAuction < ActiveRecord::Migration
  def change
    create_table :admins_auctions, id: false do |t|
      t.belongs_to :admin, index: true
      t.belongs_to :auction, index: true
    end
  end
end
