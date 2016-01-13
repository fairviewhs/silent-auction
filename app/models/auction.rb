class Auction < ActiveRecord::Base
  has_many :bids
  has_many :items
  has_and_belongs_to_many :admins
end
