class User < ActiveRecord::Base
  has_many :bids
  has_many :items, through: :bids
end
