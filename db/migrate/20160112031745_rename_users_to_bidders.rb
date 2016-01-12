class RenameUsersToBidders < ActiveRecord::Migration
  def change
    def self.up
      rename_table :users, :bidders
    end

    def self.down
      rename_table :bidders, :users
    end
  end
end
