class Item < ActiveRecord::Base
  has_many :bids
  has_many :bidders, through: :bids
  belongs_to :Auction
end
