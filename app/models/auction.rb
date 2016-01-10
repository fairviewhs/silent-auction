class Auction < ActiveRecord::Base
  has_many :bids
  has_many :items
end
