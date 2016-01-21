class CreateDonations < ActiveRecord::Migration
  def change
    create_table :donations do |t|
      t.string :name
      t.float :amount
      t.string :email
      t.string :phone

      t.timestamps null: false
    end
  end
end
