class Item < ActiveRecord::Base
  has_many :bids
  has_many :users, through: :bids
  belongs_to :Auction
end
