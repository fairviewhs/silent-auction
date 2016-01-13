class Auction < ActiveRecord::Base
  has_many :bids
  has_many :items
  belongs_to :admins
end
