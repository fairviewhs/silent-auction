class Add2PicturesToItem < ActiveRecord::Migration
  def self.up
    change_table :items do |t|
      t.attachment :picture2
      t.attachment :picture3
    end
  end

  def self.down
    remove_attachment :items, :picture2
    remove_attachment :items, :picture3
  end
end
