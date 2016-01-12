class Bid < ActiveRecord::Base
  belongs_to :Bidder
  belongs_to :Item
  belongs_to :Auction
end
