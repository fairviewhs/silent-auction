class Bid < ActiveRecord::Base
  belongs_to :User
  belongs_to :Item
  belongs_to :Auction
end
