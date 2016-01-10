class CreateAuctions < ActiveRecord::Migration
  def change
    create_table :auctions do |t|
      t.string :name
      t.string :host
      t.string :description
      t.datetime :start_time
      t.datetime :end_time

      t.timestamps null: false
    end
  end
end
